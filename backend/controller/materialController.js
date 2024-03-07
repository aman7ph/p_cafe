import Material from "../models/materialModel.js"
import asyncHandler from "express-async-handler"

export const getAllMaterials = asyncHandler(async (req, res, next) => {
  const pageSize = 3
  const page = Number(req.query.pageNumber) || 1
  const count = await Material.countDocuments({})
  const materials = await Material.find({})
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.status(200).json({
    status: "success",
    materials,
    pages: Math.ceil(count / pageSize),
    page,
  })
})
export const createMaterial = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const { name, initialNumber } = req.body
  const material = await Material.create({
    name,
    initialNumber,

    remainingNumber: initialNumber,
  })
  if (material) {
    res.status(201).json({
      status: "success",
      material,
    })
  } else {
    res.status(400)
    throw new Error("Invalid material data")
  }
})

export const deleteMaterialById = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const deletedMaterial = await Material.findByIdAndDelete(id)
  if (!deletedMaterial) {
    res.status(404)
    throw new Error("Material not found")
  }
  res.status(200).json({
    status: "success",
    message: "Material deleted successfully",
  })
})
export const getMaterialById = asyncHandler(async (req, res, next) => {
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

export const addMaterials = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const material = await Material.findById(id)

  if (!material) {
    res.status(404)
    throw new Error("material not found")
  }

  material.addedNumber =
    material.addedNumber + req.body.addedNumber || material.addedNumber

  material.remainingNumber =
    material.remainingNumber + req.body.addedNumber || material.remainingNumber

  const addedMaterials = await material.save()

  res.status(200).json({
    status: "success",
    addedMaterials,
  })
})

export const substractMaterials = asyncHandler(async (req, res, next) => {
  const { id } = req.params
  const material = await Material.findById(id)

  if (!material) {
    res.status(404)
    throw new Error("material not found")
  }

  material.damagedNumber =
    material.damagedNumber + req.body.damagedNumber || material.damagedNumber

  material.remainingNumber =
    material.remainingNumber - req.body.damagedNumber ||
    material.remainingNumber

  const substractedMaterials = await material.save()

  res.status(200).json({
    status: "success",
    substractedMaterials,
  })
})
