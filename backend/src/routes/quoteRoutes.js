import { Router } from 'express'
import { protect, adminOnly } from '../middleware/auth.js'
import { createQuote, listQuotes, setStatus, deleteQuote, stats } from '../controllers/quoteController.js'

const r = Router()
r.use(protect)
r.route('/').get(listQuotes).post(createQuote)
r.get('/stats', adminOnly, stats)
r.put('/:id/status', adminOnly, setStatus)
r.delete('/:id', adminOnly, deleteQuote)
export default r