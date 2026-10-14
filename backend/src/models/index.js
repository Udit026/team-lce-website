import User from './User.js'
import Quote from './Quote.js'
import RateCardSection from './RateCardSection.js'

User.hasMany(Quote, { foreignKey: 'userId', onDelete: 'CASCADE' })
Quote.belongsTo(User, { foreignKey: 'userId' })

export { User, Quote, RateCardSection }