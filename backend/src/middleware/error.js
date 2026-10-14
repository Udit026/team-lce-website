export const notFound = (req, _res, next) => {
  const e = new Error(`Not found: ${req.originalUrl}`); e.status = 404; next(e)
}

export const errorHandler = (err, _req, res, _next) => {
  let status = err.status || 500
  let message = err.message
  if (err.name === 'SequelizeUniqueConstraintError') { status = 409; message = 'This email is already registered.' }
  if (err.name === 'SequelizeValidationError') { status = 400; message = err.errors.map((e) => e.message).join(', ') }
  if (status === 500) console.error(err)
  res.status(status).json({ message: status === 500 ? 'Server error.' : message })
}