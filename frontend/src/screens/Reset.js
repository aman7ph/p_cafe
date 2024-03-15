import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "../components/Loader"
import { toast } from "react-toastify"
import { useResetPasswordMutation } from "../redux/slices/userApiSlice"

const Reset = () => {
  const { token } = useParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()

  const [resetPassword, { isLoading }] = useResetPasswordMutation()

  const { userInfo } = useSelector((state) => state.auth)
  console.log(userInfo)

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    } else {
      try {
        await resetPassword({ password, token }).unwrap()
        toast.success("Password reset")
        navigate("/login")
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <FormContainer>
      <h1>Reset</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={isLoading}>
          Reset
        </Button>
        {isLoading && <Loader />}

        <Row className="py-3">
          <Col>
            if you alredy have an account?
            <Link to={"/login"}>Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}
export default Reset
