import React, { useRef, useState } from "react"
import {
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
      <Container ref={ref} className="text-center ">
        <Row className="">
          <Col xs={12}>
            <ListGroup>
              <ListGroupItem
                className="text-black border"
                style={{ padding: "0" }}
              >
                <div className="d-flex justify-content-around text-black  border-bottom   ">
                  <small className=" spacer xs-text">Profesor cafe</small>
                  <small className=" spacer xs-text">
                    {" "}
                    {dateFormater(Date.now())}
                  </small>
                </div>
                <div className="d-flex justify-content-around text-black  ">
                  <small className=" spacer xs-text">Name</small>
                  <small className=" spacer xs-text"> {order.owner}</small>
                </div>

                <div className="d-flex justify-content-around text-black   ">
                  <small className=" spacer xs-text">O_Number</small>
                  <small className=" spacer xs-text">
                    {" "}
                    {order.orderNumber}
                  </small>
                </div>

                <div className="d-flex justify-content-around text-black ">
                  <small className=" spacer xs-text">Time</small>
                  <small className=" spacer xs-text">{order.ariveTime}</small>
                </div>
                <div className="d-flex justify-content-around text-black  ">
                  <small className=" spacer xs-text">Table</small>
                  <small className=" spacer xs-text">{table}</small>
                </div>
                <div className="d-flex justify-content-around text-black  ">
                  <small className=" spacer xs-text">Total</small>
                  <small className=" spacer xs-text">
                    {order.totalPrice}Br
                  </small>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>

        <Row style={{ padding: "0" }}>
          <Col xs={12}>
            <ListGroup className=" mt-2">
              <ListGroupItem className="text-black" style={{ padding: "0" }}>
                <div className="d-flex justify-content-around text-black  ">
                  <small className=" spacer xs-text">Name</small>
                  <small className=" spacer xs-text"> {order.owner}</small>
                </div>

                <div className="d-flex justify-content-around text-black   ">
                  <small className=" spacer xs-text">O_Number</small>
                  <small className=" spacer xs-text">
                    {" "}
                    {order.orderNumber}
                  </small>
                </div>

                <div className="d-flex justify-content-around text-black ">
                  <small className=" spacer xs-text">Time</small>
                  <small className=" spacer xs-text">{order.ariveTime}</small>
                </div>
                <div className="d-flex justify-content-around text-black  ">
                  <small className=" spacer xs-text">Table</small>
                  <small className=" spacer xs-text">{table}</small>
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>

        {order.orderItems.map((item, index) => (
          <ListGroup.Item key={index} style={{ padding: "0" }}>
            <div className="d-flex justify-content-around text-black border-bottom  ">
              <small className=" spacer xs-text">{item.name}</small>
              <small className=" spacer xs-text">{`(${item.qty})`}</small>
            </div>
          </ListGroup.Item>
        ))}

        <Row className="text-black ">
          <Col xs={12} className="d-flex justify-content-between">
            <small className="spacer xs-text ">
              {dateFormater(Date.now())}
            </small>
            <small className=" xs-text ">Total: {order.totalPrice}Br</small>
          </Col>
        </Row>
      </Container>

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
