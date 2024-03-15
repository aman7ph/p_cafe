import fs from "fs"
import Product from "./../models/productModel.js"
import asyncHandler from "express-async-handler"
import { fileURLToPath } from "url"
import path from "path"

export const getAllProduct = asyncHandler(async (req, res, next) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        $and: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { status: true },
        ],
      }
    : req.query.category
    ? { $and: [{ category: req.query.category }, { status: true }] }
    : { status: true }

  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.status(200).json({
    status: "success",
    result: products.length,
    pages: Math.ceil(count / pageSize),
    page,
    products,
  })
})

export const getProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const product = await Product.findOne({ _id: id })

  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }

  res.status(200).json({
    status: "success",
    product,
  })
})
export const createProduct = asyncHandler(async (req, res, next) => {
  try {
    console.log(req.body)

    const { name, price, description, category, image } = req.body

    const product = {
      name,
      user: req.user.id,
      category: category || "food",
      price,
      description,
      image,
    }

    const createdProduct = await Product.create(product)

    res.status(201).json({
      status: "success",
      product: createdProduct,
    })
  } catch (error) {
    console.log(error)
  }
})

export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  console.log(req.body)
  const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  })

  if (!updateProduct) {
    res.status(404)
    throw new Error("Product not found")
  } else {
    res.status(200).json({
      status: "success",
      product: updateProduct,
    })
  }
})
export const deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  const product = await Product.findByIdAndDelete(id)

  try {
    const __filename = fileURLToPath(import.meta.url)
    const __dirname = path.dirname(__filename)
    const imagePath = path.join(__dirname, "..", "..", product.image)
    await fs.promises.unlink(imagePath)

    console.log("Image deleted successfully")
  } catch (err) {
    console.error("Error while deleting image:", err)
  }

  res.status(200).json({
    status: "success",
    message: "Product deleted",
  })
})

export const getLandingPageProduct = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(4)

  res.status(200).json(products)
})

export const updateProductStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const product = await Product.findById(id)
  if (!product) {
    res.status(404)
    throw new Error("Product not found")
  }
  product.status = !product.status
  await product.save()
  res.status(200).json({
    status: "success",
    product,
  })
})

export const getAllProductForAdmin = asyncHandler(async (req, res, next) => {
  const pageSize = 8
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        $and: [
          { name: { $regex: req.query.keyword, $options: "i" } },
          { status: true },
        ],
      }
    : req.query.category
    ? { category: req.query.category }
    : {}
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.status(200).json({
    status: "success",
    result: products.length,
    pages: Math.ceil(count / pageSize),
    page,
    products,
  })
})

export const getProductByCategory = asyncHandler(async (req, res, next) => {
  const { category } = req.params
  const products = await Product.find({ category: category })

  res.status(200).json({
    status: "success",
    products,
  })
})
