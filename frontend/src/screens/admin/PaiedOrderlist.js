import { FaTimes, FaArrowLeft } from "react-icons/fa"
import { ImCheckmark } from "react-icons/im"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { useParams, Link } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import { Table, Button, ListGroup } from "react-bootstrap"

import { usePaiedOrderQuery } from "../../redux/slices/orderApiSlice"
import Paginate from "../../components/Paginate"

const PaiedOrderlist = () => {
  const { pageNumber } = useParams()
  const { data, isLoading, error } = usePaiedOrderQuery({
    pageNumber,
  })

  console.log(
    usePaiedOrderQuery({
      pageNumber,
    })
  )

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
              <th>List</th>
              <th>TOTAL PRICE</th>
              <th>PAID</th>
            </tr>
          </thead>
          <tbody>
            {data?.orders?.map((order) => (
              <tr key={order._id}>
                <td>{order.orderNumber || "1234"}</td>
                <td>{order.owner}</td>
                <td>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <div>
                        <p>
                          {item.name}
                          <strong>{`(${item.qty})`}</strong>
                        </p>
                      </div>
                    </ListGroup.Item>
                  ))}
                </td>
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
                    <Button variant="dark" className="btn-sm p-2">
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
        link="/admin/paiedorderlist"
      />
    </>
  )
}

export default PaiedOrderlist
