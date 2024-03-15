import { FaTrash } from "react-icons/fa"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import {
  useGetFeedbacksQuery,
  useDeleteFeedbackMutation,
} from "../../redux/slices/feedbackSlice"
import { toast } from "react-toastify"
import { useParams, Link } from "react-router-dom"
import Paginate from "../../components/Paginate"
import { FaArrowLeft } from "react-icons/fa"

const FeedbackList = () => {
  const { pageNumber } = useParams()

  let { data, isLoading, error, refetch } = useGetFeedbacksQuery({
    pageNumber,
  })

  const [deleteFeedback, { error: deleterror }] = useDeleteFeedbackMutation()

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteFeedback(id)
        refetch()
        toast.success("FeedBack deleted")
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
            {" "}
            <Link to="/" className="btn btn-light mx-4">
              <FaArrowLeft /> go back
            </Link>
            FeedBacks
          </h2>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error || deleterror ? (
        <Message variant="danger">
          {error.data.message || deleterror.data.message}
        </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>COMMENT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data.feedbacks.map((feedback) => (
              <tr key={feedback._id}>
                <td>{feedback.name}</td>
                <td>{feedback.email}</td>
                <td>{feedback.comment}</td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(feedback._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                  <LinkContainer to={`/admin/feedback/${feedback._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate
        page={data?.page}
        pages={data?.pages}
        isAdmin={true}
        link="/admin/feedbacklist"
      />
    </>
  )
}

export default FeedbackList
