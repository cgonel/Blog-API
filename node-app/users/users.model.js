import sequelize from '../database/connection.js'
import { DataTypes } from 'sequelize'

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING
  },
  username: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  website: {
    type: DataTypes.STRING
  }
})

try {
  (async () => {
    await User.sync()
  })()
} catch (err) {
  console.error('Model User was unable to sync', err)
}

export default User
