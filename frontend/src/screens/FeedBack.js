import React, { useState } from "react"
import { Form, Col, Button, Row } from "react-bootstrap"
import { useAddFeedbackMutation } from "./../redux/slices/feedbackSlice"
import { toast } from "react-toastify"

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
    <div className="d-flex justify-content-center mt-5 ">
      <Row className=" w-75 ">
        <Col sm={12} md={8} lg={12} className="">
          <h2>Feedback</h2>
          <Form onSubmit={handleSubmit}>
            <Col lg={8} md={12} className="">
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
            <Col lg={8} md={12}>
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

            <Button variant="primary" type="submit">
              Submit Feedback
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default FeedbackForm
