import express from "express";
import {
  getTodayReport,
  getThisWeekReport,
  getThisMonthReport,
  getThisYearReport,
  getBySpecifyingDayReport,
} from "./../controller/reportController.js";
import { protect, admin } from "./../middleware/authMidleware.js";

const router = express.Router();

router.route("/").get(getTodayReport);
router.route("/week").get(getThisWeekReport);
router.route("/month").get(getThisMonthReport);
router.route("/year").get(getThisYearReport);
router.route("/spacific").get(getBySpecifyingDayReport);

// router.route("/:id/status").put(protect, admin, updateProductStatus);

export default router;
