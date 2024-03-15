import { FaEdit, FaTrash, FaPlus } from "react-icons/fa"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import {
  useGetAllPromotionsQuery,
  useDeletePromotionMutation,
} from "../../redux/slices/promotionApiSlice"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"

const PromotionListScreen = () => {
  const { data, isLoading, error, refetch } = useGetAllPromotionsQuery()

  const [deleteProduct, { error: deleteerror }] = useDeletePromotionMutation()

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id)
        refetch()
        toast.success("Promotion deleted")
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <>
      <Row>
        <Col>
          <h2>
            <Link to="/" className="btn btn-light mx-4">
              <FaArrowLeft /> go back
            </Link>
            Products
          </h2>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error || deleteerror ? (
        <Message variant="danger">
          {error.data.message || deleteerror.data.message}
        </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.promotions.map((promotion) => (
              <tr key={promotion._id}>
                <td>{promotion._id}</td>
                <td>{promotion.name}</td>

                <td>
                  <LinkContainer to={`/admin/promotion/${promotion._id}`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(promotion._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default PromotionListScreen
