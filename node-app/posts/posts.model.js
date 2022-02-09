import sequelize from '../database/connection.js'
import { DataTypes } from 'sequelize'

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING
  },
  body: {
    type: DataTypes.TEXT
  }
})

try {
  ;(async () => {
    await Post.sync()
  })()
} catch (err) {
  console.error('Model Post was unable to sync', err)
}

export default Post
