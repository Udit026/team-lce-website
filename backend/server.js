import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { connectDB } from './src/config/db.js'
import './src/models/index.js'
import authRoutes from './src/routes/authRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import rateCardRoutes from './src/routes/rateCardRoutes.js'
import quoteRoutes from './src/routes/quoteRoutes.js'
import { notFound, errorHandler } from './src/middleware/error.js'

for (const k of ['DATABASE_URL', 'JWT_SECRET']) {
  if (!process.env[k]) { console.error(`Missing ${k} in .env`); process.exit(1) }
}

const app = express()
app.use(helmet())
app.use(cors({ origin: (process.env.CLIENT_URL || 'http://localhost:5173').split(','), credentials: true }))
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => res.json({ ok: true }))
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/ratecard', rateCardRoutes)
app.use('/api/quotes', quoteRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000
connectDB()
  .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
  .catch((e) => { console.error('DB connection failed:', e.message); process.exit(1) })