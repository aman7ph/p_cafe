const notFound = (res, req, next) => {
  res.status(404)
  throw new Error(`Not Found - ${req.originalUrl}`)
}

const errorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = error.message

  //check if mongoose object id error
  if (error.name === "CastError") {
    statusCode = 404
    message = "Resource not found"
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : error.stack,
  })
}

export { notFound, errorHandler }
