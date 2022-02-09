import Sequelize from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const dbSocketPath = process.env.DB_SOCKET_PATH || '/cloudsql'

if (process.env.NODE_ENV == 'production') {
  var sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      dialect: 'mysql',
      port: process.env.DB_PORT,
      dialectOptions: {
        socketPath: `${dbSocketPath}/${process.env.DB_HOST}`
      }
    }
  )
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: process.env.DB_PORT
    }
  )
}

try {
  ;(async () => {
    await sequelize.authenticate()
  })()
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default sequelize
