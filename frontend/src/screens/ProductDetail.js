import { useParams, Link } from "react-router-dom"

import { Row, Col, Image, ListGroup } from "react-bootstrap"
import { FaArrowLeft } from "react-icons/fa"

import { useGetProductDetailsQuery } from "../redux/slices/productApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"

const ProductDetail = () => {
  const { id } = useParams()
  const { data, isLoading, isError: error } = useGetProductDetailsQuery(id)

  return (
    <>
      <Link to="/" className="btn btn-light my-3 rounded-circle">
        <FaArrowLeft />
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <Image src={data.product.image} alt={data.product.name} fluid />
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{data.product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Price: ${data.product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {data.product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductDetail
