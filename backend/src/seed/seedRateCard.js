import 'dotenv/config'
import { connectDB, sequelize } from '../config/db.js'
import { RateCardSection } from '../models/index.js'
// Frontend ki purani src/data/rateCard.js ki copy (default prices ka source)
import * as R from './rateCardDefaults.js'

const defaults = {
  baseFee: R.BASE_FEE, langPct: R.LANG_PCT, adFee: R.AD_FEE, perMonth: R.PER,
  platforms: R.PLATFORMS, content: R.CONTENT, cameras: R.CAMS, fieldItems: R.FIELD,
  liveDestinations: R.LIVE_DEST, liveRates: { rate: R.LIVE_RATE, extraDest: R.LIVE_EXTRA_DEST },
  equipment: R.EQUIP, presets: R.PRESETS, compareTable: R.COMPARE, waPacks: R.WA_PACKS,
  addons: R.ADDONS, contact: R.CONTACT,
}

// Jo section pehle se hai use CHHEDTA NAHI (admin ke badlaav safe rehte hain).
// Sab default par reset karna ho:  npm run seed:ratecard -- --force
const force = process.argv.includes('--force')

export async function seedRateCard() {
  let written = 0
  for (const [key, value] of Object.entries(defaults)) {
    if (!force && (await RateCardSection.findByPk(key))) continue
    await RateCardSection.upsert({ key, data: value })
    written++
  }
  return written
}

if (process.argv[1].endsWith('seedRateCard.js')) {
  await connectDB()
  console.log(`Rate card: ${await seedRateCard()} section(s) written.`)
  await sequelize.close()
}