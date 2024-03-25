import { FaTrash, FaPlus, FaPlusCircle, FaMinusCircle } from "react-icons/fa"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col, Form } from "react-bootstrap"
import {
  useGetMaterialsQuery,
  useDeleteMaterialByIdMutation,
  useAddMaterialsMutation,
  useSubstractMaterialsMutation,
} from "../../redux/slices/MaterialApiSlice"
import { toast } from "react-toastify"
import { useParams, Link } from "react-router-dom"
import Paginate from "../../components/Paginate"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"

const MaterialList = () => {
  const [num, setNum] = useState(0)
  const { pageNumber } = useParams()

  let { data, isLoading, error, refetch } = useGetMaterialsQuery({
    pageNumber,
  })

  const [deleteProduct, { error: deleteerror }] =
    useDeleteMaterialByIdMutation()
  const [addMaterial] = useAddMaterialsMutation()
  const [substractMaterial] = useSubstractMaterialsMutation()

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id)
        refetch()
        toast.success("Product deleted")
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  const addMaterialHandler = async (id) => {
    console.log("addMaterialHandler")
    try {
      await addMaterial({ id, addedNumber: num })
      refetch()
      toast.success("Material added")
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const substractMaterialHandler = async (id) => {
    console.log("substractMaterialHandler")
    try {
      await substractMaterial({ id, damagedNumber: num })
      refetch()
      toast.success("Material substracted")
    } catch (error) {
      toast.error(error?.data?.message || error.error)
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
            Materials
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
              <th>NAME</th>
              <th>INITIAL_NO</th>
              <th>DMEGED_NO</th>
              <th>REMAINIG_NO</th>
              <th>ADDED_NO</th>
              <th>TOTAL</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.materials.map((material) => (
              <tr key={material._id}>
                <td>{material.name}</td>
                <td>{material.initialNumber}</td>
                <td>{material.damagedNumber}</td>
                <td>{material.remainingNumber}</td>
                <td>{material.addedNumber}</td>
                <td>{material.initialNumber + material.addedNumber}</td>
                <td>
                  <Form className="d-flex">
                    <Form.Group controlId="num">
                      <Form.Control
                        type="number"
                        placeholder="Enter number"
                        value={num}
                        onChange={(e) => setNum(Number(e.target.value))}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        addMaterialHandler(material._id)
                      }}
                    >
                      <FaPlusCircle />
                    </Button>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => {
                        substractMaterialHandler(material._id)
                      }}
                    >
                      <FaMinusCircle />
                    </Button>
                  </Form>
                </td>
                <td>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(material._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
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
        link="/admin/materiallist"
      />
    </>
  )
}

export default MaterialList
