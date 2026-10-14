import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
import { asyncHandler, HttpError } from '../utils/asyncHandler.js'

export const protect = asyncHandler(async (req, _res, next) => {
  const h = req.headers.authorization || ''
  const token = h.startsWith('Bearer ') ? h.slice(7) : null
  if (!token) throw new HttpError(401, 'Please log in.')
  let payload
  try { payload = jwt.verify(token, process.env.JWT_SECRET) } catch { throw new HttpError(401, 'Session expired. Please log in again.') }
  const user = await User.findByPk(payload.id)
  if (!user || !user.isActive) throw new HttpError(401, 'Account not available.')
  req.user = user
  next()
})

export const adminOnly = (req, _res, next) =>
  req.user?.role === 'admin' ? next() : next(new HttpError(403, 'Admin access only.'))