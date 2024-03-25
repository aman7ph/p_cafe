import path from "path"
import express from "express"
import multer from "multer"
import sharp from "sharp"

const router = express.Router()

const storage = multer.memoryStorage()

const upload = multer({
  storage,
})
const resize = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  req.file.filename = `image-${Date.now()}.jpeg`
  req.file.path = `uploads/${req.file.filename}`
  sharp(req.file.buffer)
    .resize({
      width: 400,
      height: 400,
      fit: "fill",
    })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.resolve("uploads/", req.file.filename))
  next()
}

router.route("/").post(upload.single("image"), resize, (req, res) => {
  res.send({
    message: "image is uploaded",
    image: `/${req.file.path}`,
  })
})
export default router
