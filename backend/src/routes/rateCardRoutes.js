import { Router } from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import { getRateCard, updateSection } from '../controllers/rateCardController.js'

const r = Router()
r.get('/', protect, getRateCard)                          // koi bhi logged-in user
r.put('/:section', protect, adminOnly, updateSection)     // sirf admin
export default r