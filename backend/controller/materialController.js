import Material from "../models/materialModel"
import asyncHandler from "express-async-handler"

export const getAllMaterial = asyncHandler(async (req, res, next) => {
  const materials = await Material.find()

  if (!materials) {
    res.status(404)
    throw new Error("Materials not found")
  }

  res.status(200).json({
    status: "success",
    materials,
  })
})

export const getMaterial = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const material = await Material.findById(id)

  if (!material) {
    res.status(404)
    throw new Error("Material not found")
  }
  res.status(200).json({
    status: "success",
    material,
  })
})

export const deleteMaterial = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  await Material.findByIdAndDelete(id)

  res.status(200).json({
    status: "success",
    message: "Material deleted",
  })
})
export const addTotalNumber= asyncHandler(async (req, res, next) => {
    const { id } = req.params
    const material = await Material.findById(id)
    if (!material) {
      res.status(404)
      throw new Error("Material not found")
    }
    if ( req.body.totalNumber < material.damagedNumber) {
        res.status(404)
      throw new Error ("Total number cannot be less than damaged number")
        
      }
    const difference = totalNumber - material.totalNumber;
    material.totalNumber = req.body.totalNumber || material.totalNumber
    material.remainingNumber=material.remainingNumber+difference;
