import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { login, me } from '../controllers/authController.js'
import { protect } from '../middleware/auth.js'

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, message: { message: 'Too many attempts. Try again later.' } })

const r = Router()
r.post('/login', loginLimiter, login)
r.get('/me', protect, me)
export default r