import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import FormContainer from "../../components/FormContainer"
import { useCreateMaterialMutation } from "../../redux/slices/MaterialApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { FaArrowLeft } from "react-icons/fa"

const CreateMaterialsScreen = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [initialNumber, setInitialNumber] = useState(1)

  const [createMaterial, { isLoading, error }] = useCreateMaterialMutation()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const { data } = await createMaterial({
        name,
        initial_number: initialNumber,
      })
      if (data) {
        toast.success("material created")
        navigate("/admin/materiallist")
      }
    } catch (error) {
      toast.error("Failed to create material")
    }
  }

  return (
    <>
      <Link to="/" className="btn btn-light mx-4">
        <FaArrowLeft /> go back
      </Link>

      <FormContainer>
        <h1>Create Material</h1>

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

            <Form.Group controlId="initialNumber">
              <Form.Label>Initial Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter initial number"
                value={initialNumber}
                onChange={(e) => setInitialNumber(Number(e.target.value))}
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

export default CreateMaterialsScreen
