import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Button, Row, Col, Form } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { toast } from "react-toastify"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { setCredentials } from "../redux/slices/authSlice"
import { useProfileMutation } from "../redux/slices/userApiSlice"

import { FaTimes, FaMarkdown } from "react-icons/fa"

const ProfileScreen = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { userInfo } = useSelector((state) => state.auth)

  const [updateProfile, { isLoading: loadingProfile, error }] =
    useProfileMutation()

  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email)
      setName(userInfo.name)
    }
  }, [userInfo, userInfo.email, userInfo.name])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    } else {
      try {
        const res = await updateProfile({
          email,
          password,
          name,
        }).unwrap()
        dispatch(setCredentials(res))
        toast.success("Profile updated")
      } catch (err) {
        toast.error(err?.data?.message || err.message)
      }
    }
  }

  return (
    <Row className="d-flex  justify-content-center">
      <Col md={3}>
        <h2>User profile</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-2">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  )
}

export default ProfileScreen
