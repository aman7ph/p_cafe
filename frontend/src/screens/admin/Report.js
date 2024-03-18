import { FaArrowLeft } from "react-icons/fa"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import { Table, Button, Row, Col } from "react-bootstrap"

import {
  useDailyQuery,
  // useMonthlyQuery,
  // useYearlyQuery,
  // useWeaklyQuery,
} from "../../redux/slices/reportApiSlice"
//import { toast } from "react-toastify"
import { Link } from "react-router-dom"
//import Paginate from "../../components/Paginate"
import { useState } from "react"

const Report = () => {
  // const [startDate, setStartDate] = useState("")
  // const [endDate, setEndDate] = useState("")
  const [reportType, setReportType] = useState("") // Initial state for daily report
  // Initial state for daily report

  // Destructure data, isLoading, error, refetch from relevant hook based on reportType
  let { data, isLoading, error, refetch } = useDailyQuery({
    type: reportType,
  }) // Default to daily query

  const todayhandler = () => {
    setReportType("")
    // Fetch data for daily report using useDailyQuery
    refetch({ type: "" }) // Pass required parameters
  }
  const weaklyHandler = () => {
    setReportType("week")

    refetch({ type: "week" }) // Pass required parameters
  }

  const monthlyHandler = () => {
    setReportType("month")
    // Fetch data for monthly report using useMonthlyQuery
    refetch({ type: "month" }) // Pass required parameters
  }

  const yearlyHandler = () => {
    setReportType("year")
    // Fetch data for yearly report using useYearlyQuery
    refetch({ type: "year" }) // Pass required parameters
  }

  // const spesficHandler = (e) => {
  //   e.preventDefault()
  //   setReportType(`spacific/${startDate}`)
  //   console.log(startDate)
  //   setEndDate("")
  //   refetch({ type: `spacific/${startDate}` })
  // }
  // const rangeHandler = (e) => {
  //   e.preventDefault()
  //   setReportType(`range/${startDate}/${endDate}`)

  //   refetch({ type: `range/${startDate}/${endDate}` })
  // }
  console.log(data)
  return (
    <>
      <Row>
        <Col>
          <h2>
            <Link to="/" className="btn btn-light mx-4">
              <FaArrowLeft /> go back
            </Link>
            Report
          </h2>
        </Col>
      </Row>
      <Row>
        <Col className="d-flex ">
          <Button className="mx-1" onClick={todayhandler}>
            today
          </Button>
          <Button className="mx-1" onClick={weaklyHandler}>
            weakly
          </Button>
          <Button className="mx-1" onClick={monthlyHandler}>
            monthly
          </Button>
          <Button className="mx-1" onClick={yearlyHandler}>
            yearly
          </Button>
        </Col>
      </Row>
      <h3 className="mt-2 ">
        TOTAL_PRICE-
        <span className="mx-2 text-success">{data?.totalSoldPrice}</span>
      </h3>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error.data.message}</Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>NAME</th>
              <th>SOLD_ITEMS</th>
              <th>TOTAL_PRICE_SOLD_ITEMS</th>
            </tr>
          </thead>
          <tbody>
            {data?.itemsSold?.map((product, i) => (
              <tr key={i}>
                <td>{product.itemName}</td>
                <td>{product.totalSold}</td>
                <td>{product.totalPriceSold}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default Report
