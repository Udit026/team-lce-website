import jwt from 'jsonwebtoken'
import { User } from '../models/index.js'
import { asyncHandler, HttpError } from '../utils/asyncHandler.js'

const sign = (user) =>
  jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' })

// POST /api/auth/login   { email, password }
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) throw new HttpError(400, 'Email and password are required.')
  const user = await User.findOne({ where: { email: String(email).trim().toLowerCase() } })
  // same message for both cases, taaki koi email guess na kar sake
  if (!user || !(await user.checkPassword(password))) throw new HttpError(401, 'Incorrect email or password.')
  if (!user.isActive) throw new HttpError(403, 'Your account is disabled. Please contact admin.')
  res.json({ token: sign(user), user: user.toSafe() })
})

// GET /api/auth/me
export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user.toSafe() })
})