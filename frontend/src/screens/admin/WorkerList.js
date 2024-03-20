import { FaTrash, FaEdit, FaPlusCircle, FaMinusCircle } from "react-icons/fa"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col, Form } from "react-bootstrap"
import {
  useDeleteWorkerMutation,
  useSubtractNegativeBalanceMutation,
  useGetWorkersQuery,
  useAddNegativeBalanceMutation,
} from "../../redux/slices/workerApiSlice"
import { toast } from "react-toastify"
import { useParams, Link } from "react-router-dom"
import Paginate from "../../components/Paginate"
import { useState } from "react"
import { FaArrowLeft } from "react-icons/fa"

const WorkerList = () => {
  let { data, isLoading, error, refetch } = useGetWorkersQuery()
  const [num, setNum] = useState(0)
  const [deleteWorker, { error: deleteerror }] = useDeleteWorkerMutation()
  const [addBallance] = useAddNegativeBalanceMutation()
  const [substractBalance] = useSubtractNegativeBalanceMutation()

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteWorker(id)
        refetch()
        toast.success("Worker deleted")
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  const addBalanceHandler = async (id) => {
    try {
      await addBallance({ id, negativeBalance: num })
      refetch()
      toast.success("balance added")
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const substractBalanceHandler = async (id) => {
    console.log("substractMaterialHandler")
    try {
      await substractBalance({ id, negativeBalance: num })
      refetch()
      toast.success("balance substracted")
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
            Workers
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
              <th>PHONE</th>
              <th>ADDRESS</th>
              <th>POSSITION</th>
              <th> BALANCE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {data?.workers?.map((worker) => (
              <tr key={worker._id}>
                <td>{worker.name}</td>
                <td>{worker.phoneNumber}</td>
                <td>{worker.address}</td>
                <td>{worker.possition}</td>
                <td>{worker.negativeBalance}</td>
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
                    <div className=" mt-2 mx-2">
                      <Button
                        type="button"
                        variant="secondary"
                        className="btn-sm"
                        onClick={() => {
                          addBalanceHandler(worker._id)
                        }}
                      >
                        <FaPlusCircle />
                      </Button>
                    </div>
                    <div className=" mt-2 mx-2">
                      <Button
                        type="button"
                        variant="secondary"
                        className="btn-sm"
                        onClick={() => {
                          substractBalanceHandler(worker._id)
                        }}
                      >
                        <FaMinusCircle />
                      </Button>
                    </div>
                    <div className="mt-2 mx-2">
                      <LinkContainer to={`/admin/worker/${worker._id}`}>
                        <Button variant="secondary" className="btn-sm">
                          <FaEdit />
                        </Button>
                      </LinkContainer>
                    </div>
                    <div className="mt-2 mx-2">
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(worker._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </div>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default WorkerList
