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
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title text-center">
            <h4>
              <strong>{product.name}</strong>
            </h4>
          </Card.Title>
        </Link>

        <Card.Text as="div" className="">
          <div className="d-flex mx-2">
            <Form>
              <Form.Group controlId="qty">
                <Form.Label>Qty</Form.Label>
                <Form.Control
                  type="number"
                  className="w-75"
                  min="1"
                  max="5"
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                ></Form.Control>
              </Form.Group>
            </Form>
            <div>
              <Button
                className="btn-block mt-4"
                type="button"
                disabled={product.countInStock === 0}
                onClick={() => addToCartHandler(product._id)}
              >
                Add
              </Button>
            </div>
          </div>
        </Card.Text>

        <Card.Text as="h3" className="text-center mt-2">
          Br{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
