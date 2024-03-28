import React, { useState } from "react"
import { Form, Col, Button, Row } from "react-bootstrap"
import { useAddFeedbackMutation } from "./../redux/slices/feedbackSlice"
import { toast } from "react-toastify"
import Loader from "./../components/Loader"
import Message from "./../components/Message"

const FeedbackForm = () => {
  const [addFeedback, { isLoading, error }] = useAddFeedbackMutation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const res = await addFeedback(formData)
      if (res) {
        toast.success("Feedback submitted successfully")
        setFormData({
          name: "",
          email: "",
          comment: "",
        })
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message}</Message>
      ) : (
        <Row className=" w-100 justify-content-center mt-5 ">
          <Col xs={12} md={6} className="ms-5 ">
            <h2>Feedback</h2>
            <Form onSubmit={handleSubmit}>
              <Col lg={8} md={12} className="w-100">
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col lg={8} md={12} className="w-100">
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formComment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="comment"
                    placeholder="Write your feedback"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Button variant="primary" type="submit" className="mt-2">
                Submit Feedback
              </Button>
            </Form>
          </Col>
        </Row>
      )}
    </>
  )
}

export default FeedbackForm
