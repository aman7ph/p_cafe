import { Card, Button, Form } from "react-bootstrap"
import { Link } from "react-router-dom"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { addToCart } from "../redux/slices/cartSlice"

const Product = ({ product }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  const addToCartHandler = (id) => {
    dispatch(addToCart({ ...product, qty, id }))
  }
  return (
    <Card
      className="my-3 p-2 rounded text-center"
      style={{ width: "200px", height: "315px" }}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ width: "150px", height: "150px" }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title text-center">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="">
          <div className="d-flex">
            <Form className="">
              <Form.Group controlId="qty">
                <Form.Control
                  type="number"
                  min="1"
                  max="5"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                ></Form.Control>
              </Form.Group>
            </Form>
            <div>
              <Button
                className="btn-block mx-1 "
                type="button"
                disabled={product.countInStock === 0}
                onClick={() => addToCartHandler(product._id)}
              >
                Add
              </Button>
            </div>
          </div>
        </Card.Text>

        <Card.Text as="h3">Br{product.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
