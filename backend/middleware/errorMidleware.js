const notFound = (req, res, next) => {
  res.status(404)
  throw new Error(`Not Found - ${req.originalUrl}`)
}

const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = error.message
  console.log("error", error)
  //check if mongoose object id error
  if (error.name === "CastError") {
    statusCode = 404
    message = "Resource not found"
  }

  //check if mongoose duplicate key error
  if (error.code === 11000) {
    statusCode = 400
    message = "Duplicate field value entered"
  }

  //check if mongoose validation error
  if (error.name === "ValidationError") {
    statusCode = 400
    message = Object.values(error.errors)
      .map((val) => val.message)
      .join(", ")
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  })
}

export { notFound, errorHandler }
