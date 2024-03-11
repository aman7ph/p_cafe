import { Row, Col } from "react-bootstrap"
import { useGetLandingPageProductsQuery } from "../redux/slices/productApiSlice"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { Link } from "react-router-dom"
import Feedback from "./../screens/FeedBack"
import HomeProduct from "../components/HomeProduct"
import { FaArrowRight } from "react-icons/fa"
import Promotion from "./Promotion"
import ProductCarousel from "../components/ProductCarousel"
import { useSelector } from "react-redux"
import Dashbord from "./admin/Dashbord"

const Home = () => {
  const userInfo = useSelector((state) => state.auth.userInfo)
  const { data, isLoading, isError: error } = useGetLandingPageProductsQuery()

  return (
    <>
      {userInfo && userInfo.role === "admin" ? (
        <Dashbord />
      ) : (
        <>
          <Row className=" my-5 px-3 bg-light-gray">
            <Col sm={12} md={6} className="mb-5">
              <div className="centerd my-5">
                <h1 className="text-success">Welcome to Professor caffe</h1>
                <p>
                  It all began in 2002 with the purchase of our Genesee Street
                  location in a relatively economically depressed area of Utica.
                  The potential not only in this location but the whole area was
                  seen by our founder & president, Frank Elias.
                </p>
                <div>
                  <Link
                    to="/menu"
                    className="btn btn-success  w-50 text-white "
                  >
                    Order now
                  </Link>
                </div>
              </div>
            </Col>
            <Col sm={12} md={6} className=" d-flex justify-content-center">
              <ProductCarousel />
            </Col>
          </Row>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message>{error?.data?.message || error.error}</Message>
          ) : (
            <>
              <Row className="px-3">
                <Col>
                  <h1 className="text-success">Latest Product</h1>
                </Col>
                <Col className="d-flex justify-content-end centerd">
                  <div>
                    <Link to="/menu" className="btn btn-success text-white">
                      Our Menu <FaArrowRight className="mx-2" />
                    </Link>
                  </div>
                </Col>
              </Row>

              <Row className="px-3">
                {data.map((product) => {
                  return (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                      <HomeProduct product={product} />
                    </Col>
                  )
                })}
              </Row>

              <Row className="px-3 justify-content-center mt-5">
                <Feedback />
              </Row>
              <Row className="px-3 justify-content-center mt-5">
                <Promotion />
              </Row>
            </>
          )}
        </>
      )}
    </>
  )
}

export default Home
