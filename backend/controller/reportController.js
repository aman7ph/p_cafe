import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

const generateReport = asyncHandler(async (startDate, endDate, res) => {
  try {
    const [data] = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
          isPaid: true,
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: "$orderItems.name",
          totalSold: { $sum: "$orderItems.qty" },
          totalPriceSold: {
            $sum: { $multiply: ["$orderItems.qty", "$orderItems.price"] },
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSoldPrice: { $sum: "$totalPriceSold" },
          itemsSold: {
            $push: {
              itemName: "$_id",
              totalSold: "$totalSold",
              totalPriceSold: "$totalPriceSold",
            },
          },
        },
      },
    ])

    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    })
  }
})

// Specific report functions
const getTodayReport = asyncHandler(async (req, res) => {
  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0))
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999))
  await generateReport(startOfDay, endOfDay, res)
})

const getThisWeekReport = asyncHandler(async (req, res) => {
  const currentDate = new Date()
  const startOfWeek = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay())
  )
  const endOfWeek = new Date(startOfWeek.getTime())
  endOfWeek.setDate(startOfWeek.getDate() + 6)
  await generateReport(startOfWeek, endOfWeek, res)
})

const getThisMonthReport = asyncHandler(async (req, res) => {
  const currentDate = new Date()
  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  )
  await generateReport(startOfMonth, endOfMonth, res)
})

const getThisYearReport = asyncHandler(async (req, res) => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1)
  const endOfYear = new Date(new Date().getFullYear(), 11, 31)
  await generateReport(startOfYear, endOfYear, res)
})

const getBySpecifyingDayReport = asyncHandler(async (req, res) => {
  const specificDate = new Date(req.params)
  console.log(req.params)
  const startOfDay = specificDate.setHours(0, 0, 0, 0)
  const endOfDay = specificDate.setHours(23, 59, 59, 999)

  await generateReport(startOfDay, endOfDay, res)
})
const getBySpecifyingDayRangeReport = asyncHandler(async (req, res) => {
  console.log(req.params)
  const startDate = new Date(req.params.startDate)
  const endDate = new Date(req.params.endDate)

  await generateReport(startDate, endDate, res)
})

export {
  getTodayReport,
  getThisWeekReport,
  getThisMonthReport,
  getThisYearReport,
  getBySpecifyingDayReport,
  getBySpecifyingDayRangeReport,
}
