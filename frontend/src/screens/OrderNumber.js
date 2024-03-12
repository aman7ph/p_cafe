import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setCart } from "../redux/slices/cartSlice"
import dateFormater from "../utils/dateFormater"
import {
  useGetOrderBYorderNumberQuery,
  usePayOrderMutation,
} from "./../redux/slices/orderApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"

import { toast } from "react-toastify"
import { FaArrowLeft } from "react-icons/fa"
import { useEffect } from "react"

const OrderNumber = () => {
  console.log(useParams())
  const { orderNumber } = useParams()

  const dispatch = useDispatch()

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderBYorderNumberQuery(orderNumber)
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()
  console.log(useGetOrderBYorderNumberQuery(orderNumber))

  console.log(order)

  const { userInfo } = useSelector((state) => state.auth)
  async function onApproveTest(id) {
    if (window.confirm("Are you sure?")) {
      const { data } = await payOrder({
        id,
        details: { id: "admin", status: "approved", payer: {} },
      })
      if (data) {
        toast.success("Order paid")
        refetch()
      }
    }
  }
  const updateOederHandler = () => {
    localStorage.setItem(
      "cart",
      JSON.stringify({
        id: order._id,
        cartItems: order.orderItems,
        owner: order.owner,
        phoneNumber: order.phoneNumber,
        ariveTime: order.ariveTime,
        totalPrice: order.totalPrice,
      })
    )
    dispatch(
      setCart({
        id: order._id,
        cartItems: order.orderItems,
        owner: order.owner,
        phoneNumber: order.phoneNumber,
        ariveTime: order.ariveTime,
        totalPrice: order.totalPrice,
      })
    )
    window.location.reload()
  }
  useEffect(() => {
    refetch()
  }, [])

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <>
      <h2>
        {" "}
        <Link
          to={userInfo ? `/admin/orderlist` : "/"}
          className="btn btn-light mx-4"
        >
          <FaArrowLeft /> go back
        </Link>
        {`Your Order Number ->`}
        <strong className="text-danger">
          {" "}
          {order.orderNumber || order._id}
        </strong>
      </h2>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {userInfo && (
              <ListGroup.Item>
                {order.isPaid ? (
                  <Message variant="success">
                    Paid on {dateFormater(order.paidAt)}
                  </Message>
                ) : (
                  <Message variant="danger">Not Paid</Message>
                )}
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <h3>Order Items</h3>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <h4>
                            {item.name}
                            <strong>{`(${item.qty})`}</strong>
                          </h4>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Order Summary</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Name</Col>
                  <Col>{order.owner}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phone_No</Col>
                  <Col>{order.phoneNumber}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>arive time</Col>
                  <Col>{order.ariveTime}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Br{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>id</Col>
                  <Col>
                    <small>{order._id}</small>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {!userInfo && (
                  <div>
                    <Button
                      style={{ marginBottom: "10px" }}
                      onClick={updateOederHandler}
                    >
                      update Order
                    </Button>
                  </div>
                )}
                {userInfo && !order.isPaid && (
                  <div>
                    <Button
                      style={{ marginBottom: "10px" }}
                      onClick={() => onApproveTest(order._id)}
                    >
                      Order Paid
                    </Button>
                  </div>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderNumber
