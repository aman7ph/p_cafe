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
      <Card ref={ref} className="text-center">
        <Card.Body className="">
          <Container>
            <Row>
              <Col xs={12}>
                <ListGroup>
                  <ListGroupItem
                    className="text-black text-right border"
                    style={{ padding: "0" }}
                  >
                    <strong style={{ margin: "0" }} className="">
                      Thank for your order
                    </strong>
                    <p style={{ margin: "0" }}>Profesor cafe</p>
                    <small>{dateFormater(Date.now())}</small>
                  </ListGroupItem>
                  <ListGroupItem
                    className="text-black border"
                    style={{ padding: "0" }}
                  >
                    <Row>
                      <Col>
                        <p className="spacer">Name</p>
                      </Col>
                      <Col>
                        <p className="spacer">{order.owner}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="spacer">Order Number</p>
                      </Col>
                      <Col>
                        <p className="spacer">{order.orderNumber}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="spacer">Arival Time</p>
                      </Col>
                      <Col>
                        <p className="spacer">{order.ariveTime}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="spacer">Table</p>
                      </Col>
                      <Col>
                        <p className="spacer">{table}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="spacer">Total</p>
                      </Col>
                      <Col>
                        <p className="spacer">{order.totalPrice}Br</p>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>

            <Row style={{ padding: "0" }}>
              <Col xs={12}>
                <ListGroup className=" mt-2">
                  <ListGroupItem className="text-black text-right p-0 ">
                    <strong className="mx-3">Profesor cafe</strong>
                    <small>{dateFormater(Date.now())}</small>
                  </ListGroupItem>
                  <ListGroupItem
                    className="text-black"
                    style={{ padding: "0" }}
                  >
                    <Row>
                      <Col>
                        <p className="spacer">Name</p>
                      </Col>
                      <Col>
                        <p className="spacer">{order.owner}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="spacer">Order Number</p>
                      </Col>
                      <Col>
                        <p className="spacer">{order.orderNumber}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="spacer">Arival Time</p>
                      </Col>
                      <Col>
                        <p className="spacer">{order.ariveTime}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p className="spacer">Table</p>
                      </Col>
                      <Col>
                        <p className="spacer">{table}</p>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>

            {order.orderItems.map((item, index) => (
              <ListGroup.Item key={index} style={{ padding: "0" }}>
                <div className="d-flex justify-content-around text-black border-bottom  ">
                  <p className="spacer">{item.name}</p>
                  <p className="spacer">{`(${item.qty})`}</p>
                </div>
              </ListGroup.Item>
            ))}

            <Row className="text-black ">
              <Col xs={12}>
                <strong style={{ margin: "0" }} className="float-end fw-bold ">
                  Total: {order.totalPrice}Br
                </strong>
              </Col>
            </Row>
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
