import path from "path"
import express from "express"
import multer from "multer"
import sharp from "sharp"

const router = express.Router()

const storage = multer.memoryStorage()
// multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/")
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })

function checkFileType(file, cb) {
  const fileTypes = /jpg|png|jpeg/
  const extname = fileTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  )
  const mimetype = fileTypes.test(file.mimetype)

  if (fileTypes && mimetype) {
    return cb(null, true)
  } else {
    cb("images only")
  }
}
const upload = multer({
  storage,
})
const resize = (req, res, next) => {
  if (!req.file) {
    return next()
  }
  console.log(req.file)
  req.file.filename = `image-${Date.now()}.jpeg`
  req.file.path = `uploads/${req.file.filename}`
  sharp(req.file.buffer)
    .resize({
      width: 400,
      height: 400,
      fit: "cover",
    })
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(path.resolve("uploads/", req.file.filename))
  next()
}

router.route("/").post(upload.single("image"), resize, (req, res) => {
  console.log(req.file)
  res.send({
    message: "image is uploaded",
    image: `/${req.file.path}`,
  })
})
export default router
