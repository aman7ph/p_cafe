import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import FormContainer from "../../components/FormContainer"
import { useAddWorkerMutation } from "../../redux/slices/workerApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaArrowLeft } from "react-icons/fa"

const CreateWorkerScreen = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [possition, setPossition] = useState("")
  const [salary, setSalary] = useState(0)
  const [address, setAddress] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const [createWorker, { isLoading }] = useAddWorkerMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const data = await createWorker({
        name,
        possition,
        salary,
        address,
        phoneNumber,
      }).unwrap()
      if (data) {
        toast.success("worker created")
        console.log(data)
        navigate("/admin/workerslist")
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
      <Link to="/" className="btn btn-light mx-4">
        <FaArrowLeft /> go back
      </Link>

      <FormContainer>
        <h1>Create Worker</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="initialNumber">
            <Form.Label>Phone_No</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter initial number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="possition">
            <Form.Label>Possition</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter possition"
              value={possition}
              onChange={(e) => setPossition(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="salary">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter salary"
              value={salary}
              onChange={(e) => setSalary(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            create
          </Button>
        </Form>
        {isLoading && <Loader />}
      </FormContainer>
    </>
  )
}

export default CreateWorkerScreen
