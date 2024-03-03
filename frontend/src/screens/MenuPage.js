import { Row, Col } from "react-bootstrap"
import Product from "../components/Product"
import { useGetProductsQuery } from "../redux/slices/productApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { Link, useParams } from "react-router-dom"
import Paginate from "../components/Paginate"

const Home = () => {
  const { pageNumber, keyword } = useParams()
  const {
    data,
    isLoading,
    isError: error,
  } = useGetProductsQuery({ pageNumber, keyword })

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
          <Row>
            {data.products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              )
            })}
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
