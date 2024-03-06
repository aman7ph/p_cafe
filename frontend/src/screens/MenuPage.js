import { Row, Col, Form, Button } from "react-bootstrap"
import Product from "../components/Product"
import { useGetProductsQuery } from "../redux/slices/productApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { Link, useParams, useNavigate } from "react-router-dom"
import Paginate from "../components/Paginate"
import { useState } from "react"

const Home = () => {
  const navigate = useNavigate()
  const { pageNumber, keyword, category } = useParams()
  const [urlcategory, setUrlCategory] = useState(category || "")

  const {
    data,
    isLoading,
    isError: error,
  } = useGetProductsQuery({ pageNumber, keyword, category })

  const categoryChangeHandler = async (e) => {
    e.preventDefault()
    if (urlcategory) {
      navigate(`/category/${urlcategory}`)
    } else {
      navigate("/menu")
    }
  }

  return (
    <>
      {keyword && (
        <Link to="/" className="btn btn-light">
          go back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Our Menu</h1>
          {!keyword && (
            <Form onSubmit={categoryChangeHandler}>
              <Form.Group controlId="category" className="">
                <Form.Label>Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setUrlCategory(e.target.value)}
                >
                  <option value="">all category</option>
                  <option value="food">Food</option>
                  <option value="drink">Drink</option>
                </Form.Select>
              </Form.Group>
              <Button type="submit" variant="primary">
                apply filter
              </Button>
            </Form>
          )}
          <Row>
            <Col>
              <Row>
                {data.products.slice(0, 4).map((product) => {
                  return (
                    <Col
                      sm={12}
                      md={6}
                      lg={3}
                      xl={3}
                      key={product._id}
                      className="d-flex justify-content-center"
                    >
                      <Product product={product} />
                    </Col>
                  )
                })}
              </Row>
              <Row>
                {data.products.slice(4, 8).map((product) => {
                  return (
                    <Col
                      sm={12}
                      md={6}
                      lg={3}
                      xl={3}
                      key={product._id}
                      className="d-flex justify-content-center"
                    >
                      <Product product={product} />
                    </Col>
                  )
                })}
              </Row>
            </Col>
          </Row>
          <Paginate
            page={data.page}
            pages={data.pages}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  )
}

export default Home
