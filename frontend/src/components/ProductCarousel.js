import { Link } from "react-router-dom"
import Loader from "./Loader"
import Message from "./Message"
import { Carousel, Image } from "react-bootstrap"
import { useGetTopProductsQuery } from "../redux/slices/productApiSlice"

const ProductCarousel = () => {
  const { data, isLoading, error } = useGetTopProductsQuery()

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-white mb-4 w-75 ">
      {data.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="w-100 "
            />
            <Carousel.Caption>
              <h2>
                {product.name}
                {product.price}
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
