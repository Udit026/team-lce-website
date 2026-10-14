import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
})

export async function connectDB() {
  await sequelize.authenticate()
  await sequelize.sync() // tables ko automatically bana deta hai (pehli baar)
  console.log('PostgreSQL connected')
}