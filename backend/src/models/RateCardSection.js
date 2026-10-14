import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

/**
 * Pricing ka har section ek row hai: key = 'platforms', 'content', 'waPacks' ...
 * data = us section ka JSON (array ya object).
 */
const RateCardSection = sequelize.define('RateCardSection', {
  key: { type: DataTypes.STRING(60), primaryKey: true },
  data: { type: DataTypes.JSONB, allowNull: false },
  updatedBy: { type: DataTypes.UUID, allowNull: true },
}, { tableName: 'rate_card_sections' })

export default RateCardSection