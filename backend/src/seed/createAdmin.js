import 'dotenv/config'
import { connectDB, sequelize } from '../config/db.js'
import { User } from '../models/index.js'
import { seedRateCard } from './seedRateCard.js'

// Pehla admin banata hai (.env ke ADMIN_* se) aur default rate card bhi daal deta hai.
await connectDB()
const email = (process.env.ADMIN_EMAIL || 'admin@teamlce.in').toLowerCase()
const existing = await User.findOne({ where: { email } })
if (existing) {
  console.log(`Admin already exists: ${email}`)
} else {
  await User.create({
    name: process.env.ADMIN_NAME || 'Admin', constituency: 'Head Office', email,
    passwordHash: await User.hashPassword(process.env.ADMIN_PASSWORD || 'Admin@12345'), role: 'admin',
  })
  console.log(`Admin created: ${email}`)
}
console.log(`Rate card: ${await seedRateCard()} section(s) added.`)
await sequelize.close()