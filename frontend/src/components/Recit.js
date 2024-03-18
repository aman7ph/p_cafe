import React, { useRef } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import dateFormater from "../utils/dateFormater";
import ReactToPrint from "react-to-print";

const Recit = () => {
  const ref = useRef();

  return (
    <>
      <Card ref={ref} className="text-center">
        <Card.Body mx-4>
          <Container>
            <Row>
              <Col xs={12}>
                <ListGroup>
                  <ListGroupItem className="text-black text-right">
                    <h4>Thank for your order</h4>
                    <h5>Profesor cafe</h5>
                    <small>{dateFormater(Date.now())}</small>
                  </ListGroupItem>
                  <ListGroupItem className="text-black">
                    <Row>
                      <Col>
                        <strong>Name</strong>
                      </Col>
                      <Col>
                        <strong>amanuel</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Order Number</strong>
                      </Col>
                      <Col>
                        <strong>3939</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Arival Time</strong>
                      </Col>
                      <Col>
                        <strong>8:80</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <h5>Total</h5>
                      </Col>
                      <Col>
                        <h5>$393</h5>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col xs={12}>
                <ListGroup>
                  <ListGroupItem className="text-black text-right">
                    <h5>Profesor cafe</h5>
                    <small>{dateFormater(Date.now())}</small>
                  </ListGroupItem>
                  <ListGroupItem className="text-black">
                    <Row>
                      <Col>
                        <strong>Name</strong>
                      </Col>
                      <Col>
                        <strong>amanuel</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Order Number</strong>
                      </Col>
                      <Col>
                        <strong>3939</strong>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <strong>Arival Time</strong>
                      </Col>
                      <Col>
                        <strong>8:80</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>

            <hr />

            <Row className="text-black">
              <Col xs={10}>
                <p>Pro Package</p>
              </Col>
              <Col xs={2}>
                <p className="float-end">$199.00</p>
              </Col>
            </Row>
            <hr />
            <Row className="text-black">
              <Col xs={10}>
                <p>Consulting</p>
              </Col>
              <Col xs={2}>
                <p className="float-end">$100.00</p>
              </Col>
            </Row>
            <hr />
            <Row className="text-black">
              <Col xs={10}>
                <p>Support</p>
              </Col>
              <Col xs={2}>
                <p className="float-end">$10.00</p>
              </Col>
            </Row>
            <hr style={{ border: "2px solid black" }} />

            <Row className="text-black">
              <Col xs={12}>
                <h3 className="float-end fw-bold">Total: $309.00</h3>
              </Col>
            </Row>
            <hr style={{ border: "2px solid black" }} />
          </Container>
        </Card.Body>
      </Card>
      <ReactToPrint
        bodyClass="print-agreement"
        content={() => ref.current}
        trigger={() => <button type="primary">Print</button>}
      />
    </>
  );
};

export default Recit;
