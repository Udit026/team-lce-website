// import 'dotenv/config'
// import express from 'express'
// import cors from 'cors'
// import helmet from 'helmet'
// import { connectDB } from './src/config/db.js'
// import './src/models/index.js'
// import authRoutes from './src/routes/authRoutes.js'
// import userRoutes from './src/routes/userRoutes.js'
// import rateCardRoutes from './src/routes/rateCardRoutes.js'
// import quoteRoutes from './src/routes/quoteRoutes.js'
// import { notFound, errorHandler } from './src/middleware/error.js'

// for (const k of ['DATABASE_URL', 'JWT_SECRET']) {
//   if (!process.env[k]) { console.error(`Missing ${k} in .env`); process.exit(1) }
// }

// const app = express()
// app.use(helmet())
// app.use(cors({ origin: (process.env.CLIENT_URL || 'http://localhost:5173').split(','), credentials: true }))
// app.use(express.json({ limit: '1mb' }))

// app.get('/api/health', (_req, res) => res.json({ ok: true }))
// app.use('/api/auth', authRoutes)
// app.use('/api/users', userRoutes)
// app.use('/api/ratecard', rateCardRoutes)
// app.use('/api/quotes', quoteRoutes)

// app.use(notFound)
// app.use(errorHandler)

// const PORT = process.env.PORT || 5000
// connectDB()
//   .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
//   .catch((e) => { console.error('DB connection failed:', e.message); process.exit(1) })




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

import {
  notFound,
  errorHandler,
} from './src/middleware/error.js'

// Check required environment variables
for (const key of ['DATABASE_URL', 'JWT_SECRET']) {
  if (!process.env[key]) {
    console.error(`Missing required environment variable: ${key}`)
    process.exit(1)
  }
}

const app = express()

// Security headers
app.use(helmet())

// Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://team-lce-website.vercel.app',
  ...(process.env.CLIENT_URL || '')
    .split(',')
    .map((url) => url.trim().replace(/\/$/, ''))
    .filter(Boolean),
]

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header, such as server-to-server calls
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }

      console.error(`CORS blocked origin: ${origin}`)
      return callback(new Error('Origin not allowed by CORS'))
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// Parse JSON request bodies
app.use(express.json({ limit: '1mb' }))

// Health check
app.get('/api/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    message: 'Team LCE API is running',
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/ratecard', rateCardRoutes)
app.use('/api/quotes', quoteRoutes)

// Handle unknown routes
app.use(notFound)

// Central error handler
app.use(errorHandler)

// Start server after database connection
const PORT = process.env.PORT || 5000

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}`)
      console.log('Allowed frontend origins:', allowedOrigins)
    })
  })
  .catch((error) => {
    console.error('Database connection failed:', error.message)
    process.exit(1)
  })
