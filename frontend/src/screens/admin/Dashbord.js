import React from "react"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import SplitButton from "../../components/SplitButton"
import { useDailyQuery } from "./../../redux/slices/reportApiSlice"
import Card from "react-bootstrap/Card"
import { Row, Col } from "react-bootstrap"

const Dashbord = () => {
  const { data, error, isLoading } = useDailyQuery({ type: "" })
  console.log(data)

  const productActions = [
    { link: "/admin/productlist", name: "Products list" },
    { link: "/admin/product/create", name: "Create Product" },
  ]
  const orderActions = [
    { link: "/admin/orderlist", name: "Orders list" },
    { link: "/admin/paiedorderlist", name: "Paied Orders" },
  ]
  const promotionActions = [
    { link: "/admin/promotionlist", name: "Promotions lists" },
    { link: "/admin/promotion/create", name: "Create Promotion" },
  ]
  const materialActions = [
    { link: "/admin/materiallist", name: "Materials list" },
    { link: "/admin/material/create", name: "Create Material" },
  ]
  const feedbackActions = [
    { link: "/admin/feedbacklist", name: "Feedback list" },
  ]
  const reportActions = [{ link: "/admin/reports", name: "Reports" }]
  return (
    <div className="d-flex">
      <div className="w-25">
        <div className="d-flex flex-column ">
          <SplitButton title="Product" actions={productActions} />
          <SplitButton title="Order" actions={orderActions} />
          <SplitButton title="Materials" actions={materialActions} />
          <SplitButton title="Promotion" actions={promotionActions} />
          <SplitButton title="Feedback" actions={feedbackActions} />
          <SplitButton title="Reports" actions={reportActions} />
        </div>
      </div>
      <div className="mx-5 w-100">
        <h1>Dashboard</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Row>
            <Col lg={6}>
              <Card>
                <Card.Body>
                  <Card.Title>Total Price</Card.Title>
                  <Card.Subtitle
                    variant="outline-success"
                    className="mb-2 text-muted "
                  >
                    {data?.totalSoldPrice || 0}Br
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="w-100" variant="outline-success">
                <Card.Body>
                  <Card.Title>Total Order</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted ">
                    {data?.itemsSold?.length || 0}
                  </Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </div>
    </div>
  )
}

export default Dashbord
