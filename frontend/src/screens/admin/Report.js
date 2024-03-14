import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import {
  useGetAllProductsForAdminQuery,
  useDeleteProductMutation,
  useGetUpdateStatusMutation,
} from "../../redux/slices/productApiSlice";
import { toast } from "react-toastify";
import { useParams, useNavigate, Link } from "react-router-dom";
import Paginate from "../../components/Paginate";
import { useState } from "react";

const Report = () => {
  const navigate = useNavigate();
  const { pageNumber, category } = useParams();
  const [urlcategory, setUrlCategory] = useState(category || "");

  let { data, isLoading, error, refetch } = useGetAllProductsForAdminQuery({
    pageNumber,
    category,
  });

  const [updateProductStatus] = useGetUpdateStatusMutation();

  const [deleteProduct, { isLoading: loadingDelete, error: loadingError }] =
    useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product deleted");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };
  const updateStatusHandler = async (id) => {
    try {
      await updateProductStatus(id);
      refetch();
      toast.success("Product status updated");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  const categoryChangeHandler = async (e) => {
    e.preventDefault();
    if (urlcategory) {
      navigate(`/admin/category/${urlcategory}`);
    } else {
      navigate("/admin/productlist");
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h2>
            <Link to="/" className="btn btn-light mx-4">
              <FaArrowLeft /> go back
            </Link>
            Products{" "}
          </h2>
          <div>
            <Form onSubmit={categoryChangeHandler}>
              <Form.Group controlId="category" className="w-25">
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
              <Button type="submit" variant="primary" className="mt-1">
                apply filter
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATAGORY</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  {product.status ? (
                    <p style={{ color: "green" }}>Available</p>
                  ) : (
                    <p style={{ color: "red" }}>Not Available</p>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}`}>
                    <Button
                      variant="secondary"
                      className="btn-sm  text-center mx-1"
                    >
                      <FaEdit />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm  text-center mx-1"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: "white" }} />
                  </Button>
                  <Button
                    className="btn-sm text-center mx-1"
                    onClick={() => updateStatusHandler(product._id)}
                  >
                    <ImBlocked style={{ color: "yellow" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate page={data?.page} pages={data?.pages} isAdmin={true} />
    </>
  );
};

export default Report;
