import Product from "./../models/productModel.js"
import asyncHandler from "express-async-handler"

export const getAllProduct = asyncHandler(async (req, res, next) => {
  const pageSize = 4
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
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

    const { name, price, description, brand, category, countInStock, image } =
      req.body

    const product = {
      name,
      user: req.user.id,
      price,
      description,
      image,
      brand,
      category,
      countInStock,
      numReview: 0,
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

  await Product.findByIdAndDelete(id)

  res.status(200).json({
    status: "success",
    message: "Product deleted",
  })
})
export const createReviewProduct = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    const reviewIsExist = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )
    if (reviewIsExist) {
      res.status(400)
      throw new Error("product already reviewd")
    }
    if (req.user.role === "admin") {
      res.status(400)
      throw new Error("ADMIN CAN REVIEW PRODUCT")
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    product.reviews.push(review)

    product.numReviews = product.reviews.length
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length
    await product.save()
    res.status(201).json({
      status: "success",
      message: "Review added",
    })
  } else {
    res.status(404)
    throw new Error("resource not found")
  }
})

export const getTopProduct = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3)

  res.status(200).json(products)
})
export const getLandingPageProduct = asyncHandler(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(4)

  res.status(200).json(products)
})
