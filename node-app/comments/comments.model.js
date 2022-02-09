import sequelize from '../database/connection.js'
import { DataTypes } from 'sequelize'

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  postId: {
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  body: {
    type: DataTypes.TEXT
  }
})

try {
  Comment.sync()
} catch (err) {
  console.error('Model Comment was unable to sync', err)
}

export default Comment
