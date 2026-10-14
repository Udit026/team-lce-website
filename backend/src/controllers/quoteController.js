import { Quote, User } from '../models/index.js'
import { asyncHandler, HttpError } from '../utils/asyncHandler.js'

// POST /api/quotes   { candidateName, constituency, lines, totals }
export const createQuote = asyncHandler(async (req, res) => {
  const { candidateName, constituency = '', lines, totals } = req.body || {}
  if (!candidateName?.trim()) throw new HttpError(400, 'Candidate name is required.')
  if (!Array.isArray(lines) || !lines.length) throw new HttpError(400, 'Nothing selected in the quotation.')
  if (!totals || typeof totals !== 'object') throw new HttpError(400, 'Totals missing.')
  const quote = await Quote.create({
    userId: req.user.id, candidateName: candidateName.trim(), constituency: String(constituency).trim(), lines, totals,
  })
  res.status(201).json({ quote })
})

// GET /api/quotes  -> admin: sabki, user: sirf apni
export const listQuotes = asyncHandler(async (req, res) => {
  const where = req.user.role === 'admin' ? {} : { userId: req.user.id }
  const quotes = await Quote.findAll({
    where, order: [['createdAt', 'DESC']],
    include: req.user.role === 'admin' ? [{ model: User, attributes: ['id', 'name', 'email'] }] : [],
  })
  res.json({ quotes })
})

// PUT /api/quotes/:id/status  { status }   (admin)
export const setStatus = asyncHandler(async (req, res) => {
  const { status } = req.body || {}
  if (!['new', 'contacted', 'closed'].includes(status)) throw new HttpError(400, 'Invalid status.')
  const q = await Quote.findByPk(req.params.id)
  if (!q) throw new HttpError(404, 'Quote not found.')
  q.status = status
  await q.save()
  res.json({ quote: q })
})

// DELETE /api/quotes/:id  (admin)
export const deleteQuote = asyncHandler(async (req, res) => {
  const n = await Quote.destroy({ where: { id: req.params.id } })
  if (!n) throw new HttpError(404, 'Quote not found.')
  res.json({ message: 'Quote deleted.' })
})

// GET /api/quotes/stats  (admin)
export const stats = asyncHandler(async (_req, res) => {
  const [users, quotes, newQuotes] = await Promise.all([
    User.count({ where: { role: 'user' } }), Quote.count(), Quote.count({ where: { status: 'new' } }),
  ])
  res.json({ users, quotes, newQuotes })
})