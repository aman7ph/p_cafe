import React from "react"
import { Row, Col } from "react-bootstrap"
import imageSrc from "./../assets/promoimage/ab.jpeg"
import { IoCallSharp } from "react-icons/io5"
import { FaTelegram } from "react-icons/fa"
const About = () => {
  return (
    <>
      <Row>
        <Col sm={12} md={12} className="">
          <div
            className="card m-auto"
            style={{ maxWidth: " 960px", padding: "30px" }}
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={imageSrc}
                  className="img-fluid rounded-start"
                  style={{ height: "100%" }}
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </p>
                  <div className="d-flex mt-5">
                    <div>
                      <div>
                        <IoCallSharp size={20} />
                      </div>
                      <div>
                        <strong>Contact</strong>
                        <p>Mobile: +251 924949409</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <IoCallSharp size={20} />
                      </div>
                      <div>
                        <strong>Contact</strong>
                        <p>Mobile: +251 924949409</p>
                      </div>
                    </div>
                    <div>
                      <div>
                        <IoCallSharp size={20} />
                      </div>
                      <div>
                        <strong>Contact</strong>
                        <p>Mobile: +251 924949409</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row
        style={{ marginTop: "100px", maxWidth: "960px" }}
        className="mx-auto"
      >
        <Col sm={12} md={3}>
          <div className="card">
            <img src={imageSrc} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </Col>
        <Col sm={12} md={3}>
          <div className="card">
            <img src={imageSrc} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </Col>

        <Col sm={12} md={3}>
          <div className="card">
            <img src={imageSrc} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </Col>
        <Col sm={12} md={3}>
          <div className="card">
            <img src={imageSrc} className="card-img-top" alt="..." />
            <div className="card-body">
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Row
        style={{ marginTop: "100px", maxWidth: "960px" }}
        className="mx-auto"
      >
        <Col>
          <Row className="d-flex mt-5 justify-content-center">
            <Col xs={6} md={3} className=" d-flex flex-column">
              <h2>Developer's</h2>
            </Col>
            <Col xs={6} md={3} className="d-flex flex-column">
              <div className="">
                <strong>Amanuel Dereje</strong>
              </div>
              <div>
                <p>
                  <IoCallSharp size={20} />
                  :+251 924949409
                </p>
                <p>
                  <FaTelegram size={20} />
                  :@telegram
                </p>
              </div>
            </Col>
            <Col xs={6} md={3} className=" d-flex flex-column">
              <div className="">
                <strong>Amanuel Dereje</strong>
              </div>
              <div>
                <p>
                  <IoCallSharp size={20} />
                  :+251 924949409
                </p>
                <p>
                  <FaTelegram size={20} />
                  :@telegram
                </p>
              </div>
            </Col>
            <Col xs={6} md={3} className=" d-flex flex-column">
              <div className="">
                <strong>Amanuel Dereje</strong>
              </div>
              <div>
                <p>
                  <IoCallSharp size={20} />
                  :+251 924949409
                </p>
                <p>
                  <FaTelegram size={20} />
                  :@telegram
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
}

export default About
