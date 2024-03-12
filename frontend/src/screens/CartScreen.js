import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, ListGroup, Col, Image, Form, Button, Card } from "react-bootstrap"
import Message from "../components/Message"
import { addToCart, removeFromCart } from "./../redux/slices/cartSlice"

import { FaTrash } from "react-icons/fa"
import {
  useAddOrderItemsMutation,
  useUpdateOrderMutation,
} from "./../redux/slices/orderApiSlice"
import { clearCart } from "../redux/slices/cartSlice"
import Loader from "../components/Loader"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

const CartScreen = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [ariveTime, setAriveTime] = useState("")

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  const [addOrderItems, { isLoading, error }] = useAddOrderItemsMutation()
  const [updateOrder, { isLoading: updateLoading }] = useUpdateOrderMutation()
  const PlaceOrderHandler = async () => {
    try {
      const res = await addOrderItems({
        orderItems: cart.cartItems,
        owner: name,
        phoneNumber: phone,
        ariveTime,
        totalPrice: cart.totalPrice,
      }).unwrap()

      dispatch(clearCart())
      toast.success("Order Placed Successfully")
      navigate(`/order/${res._id}`)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }
  const updateOederHandler = async () => {
    try {
      await updateOrder({
        id: cart.id,
        orderItems: cart.cartItems,
        owner: name,
        phoneNumber: phone,
        ariveTime,
        totalPrice: cart.totalPrice,
      }).unwrap()

      dispatch(clearCart())
      toast.success("Order Updated Successfully")
      navigate(`/`)
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  useEffect(() => {
    if (cart.id) {
      setName(cart.owner)
      setPhone(cart.phoneNumber)
      setAriveTime(cart.ariveTime)
    }
  }, [cart.id, cart.owner, cart.phoneNumber, cart.ariveTime])

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: "20px" }}> Shopping cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((items) => {
              return (
                <ListGroup.Item key={items._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={items.image} alt={items.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${items._id}`}>{items.name}</Link>
                    </Col>
                    <Col md={2}>{items.price}</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={items.qty}
                        onChange={(e) =>
                          addToCartHandler(items, Number(e.target.value))
                        }
                      >
                        {[...Array(items.countInStock).keys()].map((el) => {
                          return (
                            <option key={el + 1} value={el + 1}>
                              {el + 1}
                            </option>
                          )
                        })}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(items._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal(
                {cartItems.reduce((acc, item) => acc + item.qty, 0)})
              </h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>name</Col>
                <Col>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Phone_No</Col>
                <Col>
                  <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>ariveTime</Col>
                <Col>
                  <Form.Control
                    type="date"
                    value={ariveTime}
                    onChange={(e) => setAriveTime(e.target.value)}
                  ></Form.Control>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              {error && (
                <Message variant="danger">
                  {error.data.message}
                  {console.log(error)}
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {!cart.id ? (
                <div>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0}
                    onClick={PlaceOrderHandler}
                  >
                    Place Order
                  </Button>
                  {isLoading && <Loader />}
                </div>
              ) : (
                <div>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0}
                    onClick={updateOederHandler}
                  >
                    update Order
                  </Button>
                  {updateLoading && <Loader />}
                </div>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}

export default CartScreen
