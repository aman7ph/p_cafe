import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

const HomeProduct = ({ product }) => {
  return (
    <Card className=" p-3 rounded h-100">
      <Link to={`/menu`}>
        <Card.Img src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/menu`}>
          <Card.Title as="div" className="product-title text-center m-0">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h3" className="text-center">
          {product.price}Br
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default HomeProduct
