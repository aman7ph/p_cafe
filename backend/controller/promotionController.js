import Promotion from "../models/promotionModel.js"
import asyncHandler from "express-async-handler"

export const getAllPromotion = asyncHandler(async (req, res, next) => {
  const promotions = await Promotion.find()

  if (!promotions) {
    res.status(404)
    throw new Error("Promotions not found")
  }

  res.status(200).json({
    status: "success",
    promotions,
  })
})

export const getPromotion = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const promotion = await Promotion.findById(id)

  if (!promotion) {
    res.status(404)
    throw new Error("Promotion not found")
  }
  res.status(200).json({
    status: "success",
    promotion,
  })
})

export const updatePromotion = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const promotion = await Promotion.findById(id)

  if (!promotion) {
    res.status(404)
    throw new Error("Promotion not found")
  }

  promotion.name = req.body.name || promotion.name
  promotion.image = req.body.image || promotion.image

  const updatedPromotion = await promotion.save()

  res.status(200).json({
    status: "success",
    updatedPromotion,
  })
})

export const createPromotion = asyncHandler(async (req, res, next) => {
  const { name, image } = req.body

  const promotion = await Promotion.create({
    name,
    image,
  })

  res.status(201).json({
    status: "success",
    promotion,
  })
})
export const deletePromotion = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const promotion = await Promotion.findByIdAndDelete(id)
  if (!promotion) {
    res.status(404)
    throw new Error("Promotion not found")
  }
  res.status(200).json({
    status: "data deleted successussfuly",
  })
})
