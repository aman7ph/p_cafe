import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { setCart } from "../redux/slices/cartSlice"
import dateFormater from "../utils/dateFormater"
import {
  useGetOrderDetailByIdQuery,
  usePayOrderMutation,
} from "./../redux/slices/orderApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"

import { toast } from "react-toastify"
import { FaArrowLeft } from "react-icons/fa"

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
    if (window.confirm("Are you sure?")) {
      const { data } = await payOrder({
        id,
        details: { id: "123", status: "approved", payer: {} },
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
  console.log(order)
  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>
        {" "}
        <Link to="/admin/orderlist" className="btn btn-light mx-4">
          <FaArrowLeft /> go back
        </Link>
        {`Your Order Number -> ${order.orderNumber || order._id}`}
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
