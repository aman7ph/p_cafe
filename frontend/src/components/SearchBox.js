import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
const SearchBox = () => {
  const navigate = useNavigate()
  const { keyword: urlKeyword } = useParams()
  const [keyword, setKeyword] = useState(urlKeyword || "")

  const submitHandler = () => {
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
      setKeyword("")
    } else {
      navigate("/")
      setKeyword("")
    }
  }
  return (
    <div>
      <Form onSubmit={submitHandler} className="d-flex">
        <Form.Control
          type="text"
          name="serch"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          placeholder="search food....."
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
