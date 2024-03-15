import express from "express"
import {
  getTodayReport,
  getThisWeekReport,
  getThisMonthReport,
  getThisYearReport,
  getBySpecifyingDayReport,
  getBySpecifyingDayRangeReport,
} from "./../controller/reportController.js"
import { protect, admin } from "./../middleware/authMidleware.js"

const router = express.Router()

router.route("/").get(getTodayReport)
router.route("/week").get(getThisWeekReport)
router.route("/month").get(getThisMonthReport)
router.route("/year").get(getThisYearReport)
router.route("/spacific/:startDate").get(getBySpecifyingDayReport)
router.route("/range/:startDate/:endDate").get(getBySpecifyingDayRangeReport)

// router.route("/:id/status").put(protect, admin, updateProductStatus);

export default router
