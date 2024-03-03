import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setCart } from "../redux/slices/cartSlice"

import {
  useGetOrderDetailByIdQuery,
  usePayOrderMutation,
} from "./../redux/slices/orderApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"

import { toast } from "react-toastify"

const OrderScreen = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailByIdQuery(id)
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

  const { userInfo } = useSelector((state) => state.auth)

  async function onApproveTest() {
    const { data } = await payOrder({
      id,
      details: { id: "123", status: "approved", payer: {} },
    })
    if (data) {
      toast.success("Order paid")
      refetch()
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

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            {userInfo && (
              <ListGroup.Item>
                {order.isPaid ? (
                  <Message variant="success">Paid on {order.paidAt}</Message>
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
                          <Link to={`/product/${item._id}`}>{item.name}</Link>
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
                  <Col>${order.owner}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Phone_No</Col>
                  <Col>${order.phoneNumber}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>arive time</Col>
                  <Col>${order.ariveTime}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}

                  {isLoading ? (
                    <Loader />
                  ) : (
                    <div>
                      {userInfo && (
                        <div>
                          <Button
                            style={{ marginBottom: "10px" }}
                            onClick={onApproveTest}
                          >
                            Order Paid
                          </Button>
                        </div>
                      )}
                      <div>
                        <Button
                          style={{ marginBottom: "10px" }}
                          onClick={updateOederHandler}
                        >
                          update Order
                        </Button>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
