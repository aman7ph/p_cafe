import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button } from "react-bootstrap"

const SearchOrder = () => {
  const navigate = useNavigate()

  const [number, setNumber] = useState("")
  const placeholder = "search order....."

  const getorderbyorderNumberhandler = () => {
    navigate(`/order/orderNumber/${number}`)
    setNumber("")
  }
  const handleChange = (e) => {
    console.log(e.target.value)
    setNumber(e.target.value)
  }

  return (
    <div>
      <Form className="d-flex">
        <Form.Control
          type="text"
          name="serch"
          onChange={handleChange}
          value={number}
          placeholder={placeholder}
          className="mr-sm-2 ml-sm-5 "
        ></Form.Control>
        <Button
          onClick={getorderbyorderNumberhandler}
          variant="outline-success"
          className="p-2 mx-2"
        >
          Search
        </Button>
      </Form>
    </div>
  )
}
export default SearchOrder
