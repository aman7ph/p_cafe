import React, { useRef, useState } from "react"
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Form,
} from "react-bootstrap"
import dateFormater from "../utils/dateFormater"
import ReactToPrint from "react-to-print"

const Recit = ({ order }) => {
  const ref = useRef()
  const [table, setTable] = useState("-")

  return (
    <>
      <Card ref={ref} className="text-center ">
        <Card.Body>
          <Container>
            <Row>
              <Col xs={12}>
                <ListGroup>
                  <ListGroupItem className="text-black text-right">
                    <h5 style={{ margin: "0" }}>Thank for your order</h5>
                    <h6 style={{ margin: "0" }}>Profesor cafe</h6>
                    <small>{dateFormater(Date.now())}</small>
                  </ListGroupItem>
                  <ListGroupItem className="text-black">
                    <Row>
                      <Col>
                        <strong>Name</strong>
                      </Col>
                      <Col>
                        <strong>{order.owner}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Order Number</strong>
                      </Col>
                      <Col>
                        <strong>{order.orderNumber}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Arival Time</strong>
                      </Col>
                      <Col>
                        <strong>{order.ariveTime}</strong>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <strong>Table</strong>
                      </Col>
                      <Col>
                        <strong>{table}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h5>Total</h5>
                      </Col>
                      <Col>
                        <h5>{order.totalPrice}Br</h5>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
            <hr />
            <Row style={{ padding: "0" }}>
              <Col xs={12}>
                <ListGroup>
                  <ListGroupItem className="text-black text-right">
                    <h4 style={{ margin: "0" }}>Profesor cafe</h4>
                    <small>{dateFormater(Date.now())}</small>
                  </ListGroupItem>
                  <ListGroupItem className="text-black">
                    <Row>
                      <Col>
                        <strong>Name</strong>
                      </Col>
                      <Col>
                        <strong>{order.owner}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Order Number</strong>
                      </Col>
                      <Col>
                        <strong>{order.orderNumber}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Arival Time</strong>
                      </Col>
                      <Col>
                        <strong>{order.ariveTime}</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Table</strong>
                      </Col>
                      <Col>
                        <strong>{table}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>

            <hr />

            {order.orderItems.map((item, index) => (
              <ListGroup.Item key={index}>
                <div className="d-flex justify-content-around text-black  ">
                  <p>{item.name}</p>
                  <strong>{`(${item.qty})`}</strong>
                </div>
              </ListGroup.Item>
            ))}

            <hr style={{ border: "2px solid black" }} />

            <Row className="text-black">
              <Col xs={12}>
                <h6 style={{ margin: "0" }} className="float-end fw-bold">
                  Total: {order.totalPrice}Br
                </h6>
              </Col>
            </Row>
            <hr style={{ border: "2px solid black" }} />
          </Container>
        </Card.Body>
      </Card>
      <div className="d-flex">
        <ReactToPrint
          className="bg-white"
          bodyClass="print-agreement"
          content={() => ref.current}
          trigger={() => (
            <button className="btn btn-primary px-4 mt-2">Print</button>
          )}
        />
        <Form.Control
          as="select"
          className=" mt-2 mx-3"
          value={table}
          onChange={(e) => setTable(e.target.value)}
        >
          <option value="">Select Table</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="A3">A3</option>
          <option value="A4">A4</option>
          <option value="B">B</option>
          <option value="other">Other</option>
        </Form.Control>
      </div>
    </>
  )
}

export default Recit
