import { DataTypes } from 'sequelize'
import bcrypt from 'bcryptjs'
import { sequelize } from '../config/db.js'

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING(120), allowNull: false },
  constituency: { type: DataTypes.STRING(160), allowNull: false, defaultValue: '' },
  email: { type: DataTypes.STRING(190), allowNull: false, unique: true, set(v) { this.setDataValue('email', String(v).trim().toLowerCase()) } },
  passwordHash: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM('admin', 'user'), allowNull: false, defaultValue: 'user' },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
}, { tableName: 'users' })

User.prototype.checkPassword = function (plain) { return bcrypt.compare(plain, this.passwordHash) }
User.hashPassword = (plain) => bcrypt.hash(plain, 12)

// password hash kabhi response mein na jaye
User.prototype.toSafe = function () {
  const { passwordHash, ...rest } = this.toJSON()
  return rest
}

export default User