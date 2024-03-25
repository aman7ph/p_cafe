import { FaTrash, FaEdit } from "react-icons/fa"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, Row, Col } from "react-bootstrap"
import {
  useDeleteWorkerMutation,
  useGetWorkersQuery,
} from "../../redux/slices/workerApiSlice"
import { toast } from "react-toastify"
import { Link } from "react-router-dom"

import { FaArrowLeft } from "react-icons/fa"

const WorkerList = () => {
  let { data, isLoading, error, refetch } = useGetWorkersQuery()

  const [deleteWorker, { error: deleteerror }] = useDeleteWorkerMutation()

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
              <th>SALARY</th>
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
                <td>{worker.salary}</td>
                <td>{worker.negativeBalance}</td>

                <td className="d-flex">
                  <div className=" mx-2">
                    <LinkContainer to={`/admin/worker/${worker._id}`}>
                      <Button variant="secondary" className="btn">
                        <FaEdit /> detail
                      </Button>
                    </LinkContainer>
                  </div>
                  <div className="mx-2">
                    <Button
                      variant="danger"
                      className="btn"
                      onClick={() => deleteHandler(worker._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </div>
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
