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
import { FaArrowLeft } from "react-icons/fa"

const CreatePromotionScreen = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [image, setImage] = useState("")

  const [createProduct, { isLoading, error }] = useCreatePromotionMutation()
  const [uploadProductImage, { error: uploaderror }] =
    useUploadPromotionImageMutation()

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
      <Link to="/" className="btn btn-light mx-4">
        <FaArrowLeft /> go back
      </Link>

      <FormContainer>
        <h1>Create Promotion</h1>

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

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>

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
