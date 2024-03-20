import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import FormContainer from "../../components/FormContainer"
import {
  useGetWorkerByIdQuery,
  useUpdateWorkerMutation,
} from "../../redux/slices/workerApiSlice"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const UpdateWorkerScreen = () => {
  const { id: workerId } = useParams()
  const [name, setName] = useState("")
  const [possition, setPossition] = useState("")
  const [salary, setSalary] = useState(0)
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const { data: worker, isLoading, error } = useGetWorkerByIdQuery(workerId)

  const [updateWorker, { isLoading: loadingUpdate }] = useUpdateWorkerMutation()
  const navigate = useNavigate()
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const data = await updateWorker({
        workerId,
        name,
        possition,
        salary,
        address,
        phoneNumber,
      })

      if (data) {
        toast.success("worker updated successfully")
        navigate("/admin/workerlist")
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  useEffect(() => {
    if (worker) {
      setName(worker.name)
      setPossition(worker.possition)
      setSalary(worker.salary)
      setAddress(worker.address)
      setPhoneNumber(worker.phoneNumber)
    }
  }, [worker])
  return (
    <>
      <Link to="admin/workerlist" className="btn btn-light ">
        Go Back
      </Link>
      <FormContainer>
        <h3>Edit Worker</h3>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="possition">
              <Form.Label>Possition</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter possition"
                value={possition}
                onChange={(e) => setPossition(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="salary">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter salary"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="phoneNumber">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UpdateWorkerScreen
