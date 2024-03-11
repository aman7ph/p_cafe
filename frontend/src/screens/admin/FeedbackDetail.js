import { Link, useParams } from "react-router-dom"
import { Row, Col, ListGroup, Card } from "react-bootstrap"
import dateFormater from "./../../utils/dateFormater"
import { useGetFeedbackByIdQuery } from "./../../redux/slices/feedbackSlice"
import Loader from "./../../components/Loader"
import Message from "./../../components/Message"

import { FaArrowLeft } from "react-icons/fa"
const FeedbackDetail = () => {
  const { id } = useParams()
  const { data: feedback, isLoading, error } = useGetFeedbackByIdQuery(id)

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>
        {" "}
        <Link to="/admin/feedbacklist" className="btn btn-light mx-4">
          <FaArrowLeft /> go back
        </Link>
      </h2>
      <Row>
        <Col md={6}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Feedback</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Date</Col>
                  <Col>{dateFormater(feedback.createdAt)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Name</Col>
                  <Col>{feedback.name}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Email</Col>
                  <Col>{feedback.email}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col className="d-flex flex-column">
                    <strong>Comment</strong>
                    <div>{feedback.comment}</div>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default FeedbackDetail
