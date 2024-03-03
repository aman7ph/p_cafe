import asyncHandler from "express-async-handler"
import User from "./../models/userModel.js"
import bcrypt from "bcrypt"
import generateToken from "../utils/generateToken.js"

const register = asyncHandler(async (req, res, next) => {
  const { name, password, email, role } = req.body

  if (!name || !password || !email) {
    res.status(400)
    throw new Error("Please add all fields")
  }
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error("User already exists")
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  })
  if (user) {
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    //send token cookie
    generateToken(res, user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})
const logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() + 1 * 1000),
    httpOnly: true,
  })
  res.status(200).json({ message: "logout successfuly" })
})
const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body

  const updatedFields = {}
  if (name) updatedFields.name = name
  if (email) updatedFields.email = email
  if (password) {
    const salt = await bcrypt.genSalt(10)
    updatedFields.password = await bcrypt.hash(password, salt)
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    updatedFields,
    {
      new: true,
      runValidators: true,
    }
  )
  if (updatedUser) {
    generateToken(res, updatedUser._id)
    res.status(201).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({})

  res.status(200).json(users)
})
const getUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password")
  if (user) {
    res.status(200).json(user)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id)
  if (user) {
    if (user.role === "admin") {
      res.status(400)
      throw new Error("You can't delete admin user")
    }
    await User.deleteOne({ _id: req.params.id })
    res.status(200).json({ message: "User removed" })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})
const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email, role } = req.body
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = name || user.name
    user.email = email || user.email
    user.role = role || user.role
    const updatedUser = await user.save()
    res.status(200).json(updatedUser)
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

export {
  register,
  login,
  logout,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
}
