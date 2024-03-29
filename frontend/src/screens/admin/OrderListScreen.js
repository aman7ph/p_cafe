import { FaTimes, FaArrowLeft } from "react-icons/fa"
import { ImCheckmark } from "react-icons/im"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { useParams, Link } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button } from "react-bootstrap"
import { useGetAllOrdersQuery } from "../../redux/slices/orderApiSlice"
import Paginate from "../../components/Paginate"

const OrderListScreen = () => {
  const { pageNumber } = useParams()
  const { data, isLoading, error } = useGetAllOrdersQuery({ pageNumber })
  console.log(data)
  return (
    <>
      <h2>
        {" "}
        <Link to="/" className="btn btn-light mx-4">
          <FaArrowLeft /> go back
        </Link>
        Orders
      </h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ORDER_no</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.orders?.map((order) => (
              <tr key={order._id}>
                <td>{order.orderNumber || "1234"}</td>
                <td>{order.owner}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <ImCheckmark style={{ color: "green" }} />
                  ) : (
                    <FaTimes style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate
        page={data?.page}
        pages={data?.pages}
        isAdmin={true}
        link="/admin/orderlist"
      />
    </>
  )
}

export default OrderListScreen
