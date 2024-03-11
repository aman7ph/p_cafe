import { useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import { useGetOrderDetailByIdQuery } from "./../redux/slices/orderApiSlice"
const SearchBox = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { keyword: urlKeyword } = useParams()

  const [keyword, setKeyword] = useState(urlKeyword || "")
  const placeholder =
    location.pathname === "/menu" ? "search food....." : "search order....."

  const submitHandler = () => {
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
      setKeyword("")
    } else {
      navigate("/")
      setKeyword("")
    }
  }

  console.log(location.pathname === "/")
  return (
    <div>
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="serch"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder={placeholder}
          className="mr-sm-2 ml-sm-5 "
        ></Form.Control>
        <Button type="submit" variant="outline-success" className="p-2 mx-2">
          Search
        </Button>
      </Form>
    </div>
  )
}

export default SearchBox
