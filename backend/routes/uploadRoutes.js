import path from "path"
import express from "express"
import multer from "multer"

const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/")
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

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
router.route("/").post(upload.single("image"), (req, res) => {
  res.send({
    message: "image is uploaded",
    image: `/${req.file.path}`,
  })
})
export default router
