import { FaTimes, FaArrowLeft } from "react-icons/fa";
import { ImCheckmark } from "react-icons/im";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { useParams, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, ListGroup, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useGetAllOrdersQuery,
  usePayOrderMutation,
} from "../../redux/slices/orderApiSlice";
import Paginate from "../../components/Paginate";

const OrderListScreen = () => {
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetAllOrdersQuery({
    pageNumber,
  });
  console.log(data);

  async function onApproveTest(id) {
    if (window.confirm("Are you sure?")) {
      const { data } = await payOrder({
        id,
        details: { id: "admin", status: "approved", payer: {} },
      });
      if (data) {
        toast.success("Order paid");
        refetch();
      }
    }
  }

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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.orders?.map((order) => (
              <tr key={order._id}>
                <td>{order.orderNumber || "1234"}</td>
                <td>{order.owner}</td>
                <td>
                  {" "}
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
                <td>
                  <div>
                    {!order.isPaid && (
                      <Button
                        variant="success"
                        style={{ marginBottom: "10px" }}
                        onClick={() => onApproveTest(order._id)}
                      >
                        Approve
                      </Button>
                    )}{" "}
                  </div>
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
  );
};

export default OrderListScreen;
