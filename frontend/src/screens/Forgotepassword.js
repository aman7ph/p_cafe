import { useState, useEffect } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import { toast } from "react-toastify"
import { useForgotPasswordMutation } from "../redux/slices/userApiSlice"
import { setCredentials } from "../redux/slices/authSlice"

const ForgotePassword = () => {
  const [email, setEmail] = useState("")

  const navigate = useNavigate()

  const [Forgotpassword, { isLoading }] = useForgotPasswordMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const res = await Forgotpassword({ email }).unwrap()
      toast.success(
        "you will receive an email with a link to reset your password"
      )
      console.log(res)
      navigate("/login")
    } catch (err) {
      console.log(err)
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <FormContainer>
      <h1>Forgote Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" disabled={isLoading}>
          submit
        </Button>
        {isLoading && <Loader />}

        <Row className="py-3">
          <Col>
            if you remember your password?
            <Link to={"/login"}> Login</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}
export default ForgotePassword
