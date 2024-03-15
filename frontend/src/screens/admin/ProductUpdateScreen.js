import { useEffect, useState } from "react"
import { Form, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import FormContainer from "../../components/FormContainer"
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/slices/productApiSlice"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const ProductUpdateScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")

  const { data, isLoading, error } = useGetProductDetailsQuery(id)

  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation()
  const [uploadProductImage, { error: uploaderror }] =
    useUploadProductImageMutation()

  const uploadFileHandler = async (e) => {
    const formData = new FormData()

    formData.append("image", e.target.files[0])
    try {
      const res = await uploadProductImage(formData).unwrap()
      toast.success(res.message)
      setImage(res.image)
    } catch (err) {
      toast.success(err?.data?.message || err.error)
    }
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const data = await updateProduct({
        id,
        name,
        price,
        image,
        category,
        description,
      })
      if (data) {
        toast.success("Product Updated")
        navigate("/admin/productlist")
      }
    } catch (error) {
      toast.error("Failed to update product")
    }
  }

  useEffect(() => {
    if (data) {
      setName(data.product.name)
      setPrice(data.product.price)
      setImage(data.product.image)
      setCategory(data.product.category)
      setDescription(data.product.description)
    }
  }, [data])

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Update Product</h1>
        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error || uploaderror ? (
          <Message variant="danger">
            {error.data.message || uploaderror.data.message}
          </Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(+e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>

              <Form.Control
                type="file"
                label="choose file"
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option disabled>Select an option</option>
                <option value="food">Food</option>
                <option value="drink">Drink</option>
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductUpdateScreen
