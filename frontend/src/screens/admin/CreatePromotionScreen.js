import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import FormContainer from "../../components/FormContainer"
import {
  useCreatePromotionMutation,
  useUploadPromotionImageMutation,
} from "../../redux/slices/promotionApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const CreatePromotionScreen = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  const [createProduct, { isLoading, error }] = useCreatePromotionMutation()
  const [uploadProductImage, { isLoading: uploadloading }] =
    useUploadPromotionImageMutation()

  const uploadFileHandler = async (e) => {
    const formData = new FormData()
    console.log(e.target.files[0])

    formData.append("image", e.target.files[0])
    console.log("form_data", formData)
    try {
      const res = await uploadProductImage(formData).unwrap()
      console.log("responsssssssssssss", res)
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
        image,
      })
      if (data) {
        toast.success("Promotion created")
        navigate("/admin/promotionlist")
      }
    } catch (error) {
      toast.error("Failed to create promotion")
    }
  }

  return (
    <>
      <Link to="/admin/promotionlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Create Promotion</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.message}</Message>
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

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              {/* <Form.Control
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />  */}
              <Form.Control
                type="file"
                label="choose file"
                onChange={uploadFileHandler}
              ></Form.Control>
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

export default CreatePromotionScreen
