import express from "express"

import {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  forgotePassword,
  reset,
} from "./../controller/userController.js"
import { protect, admin } from "./../middleware/authMidleware.js"

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/forgotePassword", forgotePassword)
router.route("/reset/:token").put(reset)

router.post("/logout", logout)
router.route("/profile").get(getUserProfile).put(updateUserProfile)

router.route("/").get(getUsers)
router.route("/:id").delete(deleteUser).get(getUserById).put(updateUser)

export default router
