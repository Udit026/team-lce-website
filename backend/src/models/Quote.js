import { DataTypes } from 'sequelize'
import { sequelize } from '../config/db.js'

const Quote = sequelize.define('Quote', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  candidateName: { type: DataTypes.STRING(120), allowNull: false },
  constituency: { type: DataTypes.STRING(160), allowNull: false, defaultValue: '' },
  lines: { type: DataTypes.JSONB, allowNull: false, defaultValue: [] },   // chuni hui items
  totals: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },  // service, wa, addons, spend, grand
  status: { type: DataTypes.ENUM('new', 'contacted', 'closed'), allowNull: false, defaultValue: 'new' },
}, { tableName: 'quotes' })

export default Quote