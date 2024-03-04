import { Row, Col, Image } from "react-bootstrap"

const Promotion = () => {
  return (
    <Row className="justify-content-center p-3 ms-5">
      <Col xs={6} md={3}>
        <Image
          src="/uploads/adigrat.png"
          alt="Image 1"
          className="rounded-circle "
          style={{ width: "100px", height: "100px" }}
        />
        <p>promotion</p>
      </Col>
      <Col xs={6} md={3}>
        <Image
          src="/uploads/guna.jpg"
          alt="Image 2"
          className="rounded-circle"
          style={{ width: "100px", height: "100px" }}
        />
        <p>promotion</p>
      </Col>
      <Col xs={6} md={3}>
        <Image
          src="/uploads/wegagen.png"
          alt="Image 3"
          className="rounded-circle"
          style={{ width: "100px", height: "100px" }}
        />
        <p>promotion</p>
      </Col>
      <Col xs={6} md={3}>
        <Image
          src="/uploads/abisinya.jpg"
          alt="Image 4"
          className="rounded-circle"
          style={{ width: "100px", height: "100px" }}
        />
        <p>promotion</p>
      </Col>
    </Row>
  )
}

export default Promotion
