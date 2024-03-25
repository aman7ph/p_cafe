import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa"
import FormContainer from "../../components/FormContainer"
import {
  useGetWorkerByIdQuery,
  useUpdateWorkerMutation,
  useAddNegativeBalanceMutation,
  useSubtractNegativeBalanceMutation,
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
  const [balance, setBalance] = useState(0)
  const [balanceHistory, setBalanceHistory] = useState([])
  const [num, setNum] = useState(0)
  const [reason, setReason] = useState("")
  const [addBallance] = useAddNegativeBalanceMutation()
  const [substractBalance] = useSubtractNegativeBalanceMutation()

  const {
    data: worker,
    isLoading,
    error,
    refetch,
  } = useGetWorkerByIdQuery(workerId)

  const [updateWorker, { isLoading: loadingUpdate }] = useUpdateWorkerMutation()
  const navigate = useNavigate()
  const addBalanceHandler = async (id) => {
    try {
      await addBallance({ id, negativeBalance: num, reason: reason })
      refetch()
      setNum(0)
      setReason("")
      toast.success("balance added")
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  const substractBalanceHandler = async (id) => {
    try {
      await substractBalance({ id, negativeBalance: num, reason: reason })
      setNum(0)
      setReason("")
      refetch()
      toast.success("balance substracted")
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

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
      setBalance(worker.negativeBalance)
      setBalanceHistory(worker.balanceHistory)
    }
  }, [worker])
  return (
    <>
      <Link to="/admin/workerlist" className="btn btn-light ">
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

      <div className="my-4">
        <FormContainer className=" ">
          <h3>
            Negetive Balance <span className="text-danger">-{balance}</span>
          </h3>

          <Form.Group controlId="num">
            <Form.Control
              type="number"
              placeholder="Enter number"
              value={num}
              onChange={(e) => setNum(Number(e.target.value))}
            ></Form.Control>
            <Form.Control
              type="text"
              placeholder="Enter reason"
              className="my-2"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <div className=" mt-2 mx-2">
            <Button
              type="button"
              variant="secondary"
              className="btn"
              onClick={() => {
                addBalanceHandler(worker._id)
              }}
            >
              <FaPlusCircle />
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="btn mx-3"
              onClick={() => {
                substractBalanceHandler(worker._id)
              }}
            >
              <FaMinusCircle />
            </Button>
          </div>
          <div className=" mt-3">
            <p>balance histoty</p>
            {balanceHistory.map((item, index) => {
              return (
                <div
                  key={index}
                  className="d-flex justify-content-between border"
                >
                  <p>{item}</p>
                </div>
              )
            })}
          </div>
        </FormContainer>
      </div>
    </>
  )
}

export default UpdateWorkerScreen
