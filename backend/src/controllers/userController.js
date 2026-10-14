import { User } from '../models/index.js'
import { asyncHandler, HttpError } from '../utils/asyncHandler.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// GET /api/users
export const listUsers = asyncHandler(async (_req, res) => {
  const users = await User.findAll({ order: [['createdAt', 'DESC']] })
  res.json({ users: users.map((u) => u.toSafe()) })
})

// POST /api/users   { name, constituency, email, password, role? }
export const createUser = asyncHandler(async (req, res) => {
  const { name, constituency = '', email, password, role = 'user' } = req.body || {}
  if (!name?.trim()) throw new HttpError(400, 'Name is required.')
  if (!EMAIL_RE.test(email || '')) throw new HttpError(400, 'Valid email is required.')
  if (!password || password.length < 6) throw new HttpError(400, 'Password must be at least 6 characters.')
  if (!['admin', 'user'].includes(role)) throw new HttpError(400, 'Invalid role.')
  const user = await User.create({
    name: name.trim(), constituency: constituency.trim(), email,
    passwordHash: await User.hashPassword(password), role,
  })
  res.status(201).json({ user: user.toSafe() })
})

// PUT /api/users/:id   { name?, constituency?, email?, role?, isActive? }
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id)
  if (!user) throw new HttpError(404, 'User not found.')
  const { name, constituency, email, role, isActive } = req.body || {}
  const self = user.id === req.user.id
  if (self && (role === 'user' || isActive === false)) throw new HttpError(400, 'You cannot remove your own admin access or disable yourself.')
  if (name !== undefined) user.name = String(name).trim()
  if (constituency !== undefined) user.constituency = String(constituency).trim()
  if (email !== undefined) {
    if (!EMAIL_RE.test(email)) throw new HttpError(400, 'Valid email is required.')
    user.email = email
  }
  if (role !== undefined) {
    if (!['admin', 'user'].includes(role)) throw new HttpError(400, 'Invalid role.')
    user.role = role
  }
  if (isActive !== undefined) user.isActive = !!isActive
  await user.save()
  res.json({ user: user.toSafe() })
})

// PUT /api/users/:id/password   { password }
export const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body || {}
  if (!password || password.length < 6) throw new HttpError(400, 'Password must be at least 6 characters.')
  const user = await User.findByPk(req.params.id)
  if (!user) throw new HttpError(404, 'User not found.')
  user.passwordHash = await User.hashPassword(password)
  await user.save()
  res.json({ message: 'Password updated.' })
})

// DELETE /api/users/:id
export const deleteUser = asyncHandler(async (req, res) => {
  if (req.params.id === req.user.id) throw new HttpError(400, 'You cannot delete yourself.')
  const n = await User.destroy({ where: { id: req.params.id } })
  if (!n) throw new HttpError(404, 'User not found.')
  res.json({ message: 'User deleted.' })
})