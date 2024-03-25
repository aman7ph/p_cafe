import { Row, Col, Image } from "react-bootstrap"
import { useGetAllPromotionsQuery } from "./../redux/slices/promotionApiSlice"

const Promotion = () => {
  const { data } = useGetAllPromotionsQuery()

  return (
    <Row className="justify-content-center p-3 ms-5">
      {data?.promotions.map((promotion) => (
        <Col xs={6} md={3} key={promotion._id}>
          <Image
            src={promotion.image}
            alt={promotion.name}
            className="rounded-circle "
            style={{ width: "100px", height: "100px" }}
          />
          <p>{promotion.name}</p>
        </Col>
      ))}
    </Row>
  )
}

export default Promotion
