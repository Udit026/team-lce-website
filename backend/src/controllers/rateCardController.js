import { RateCardSection } from '../models/index.js'
import { asyncHandler, HttpError } from '../utils/asyncHandler.js'
import { SECTION_KEYS, validateSection } from '../utils/rateCardSchema.js'

// GET /api/ratecard  -> { rateCard: { baseFee: 25000, platforms: [...], ... } }
export const getRateCard = asyncHandler(async (_req, res) => {
  const rows = await RateCardSection.findAll()
  const out = {}
  rows.forEach((r) => { out[r.key] = r.data })
  res.json({ rateCard: out })
})

// PUT /api/ratecard/:section   body: { data: <array|object|number> }
export const updateSection = asyncHandler(async (req, res) => {
  const { section } = req.params
  if (!SECTION_KEYS.includes(section)) throw new HttpError(404, `Unknown section "${section}".`)
  const err = validateSection(section, req.body?.data)
  if (err) throw new HttpError(400, err)
  const [row] = await RateCardSection.upsert({ key: section, data: req.body.data, updatedBy: req.user.id })
  res.json({ section, data: row.data })
})