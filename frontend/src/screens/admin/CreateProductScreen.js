import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import FormContainer from "../../components/FormContainer"
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/slices/productApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const CreateProductScreen = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [createProduct, { isLoading, error }] = useCreateProductMutation()
  const [uploadProductImage, { error: uploaderror }] =
    useUploadProductImageMutation()

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    console.log(e.target.files[0])

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
      const { data } = await createProduct({
        name,
        price,
        image,
        category: category || "food",
        description,
      })
      if (data) {
        toast.success("Product created")
        navigate("/admin/productlist")
      }
    } catch (error) {
      toast.error("Failed to create product")
    }
  }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Create Product</h1>

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
                required
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
                min={1}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>

              <Form.Control
                type="file"
                required
                label="choose file"
                onChange={uploadFileHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={category || "food"}
                required
                onChange={(e) => {
                  setCategory(e.target.value)
                  console.log(e.target.value)
                }}
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
              create
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default CreateProductScreen
