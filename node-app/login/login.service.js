import User from '../users/users.model.js'
import bcrypt from 'bcrypt'

export const findUserId = async (username) => {
  const user = await User.findAll({
    where: {
      username: username
    }
  })

  return user[0].id
}

export const comparePassword = async (password) => {
  const user = await User.findAll({
    where: {
      id: 1
    }
  })
  const result = await bcrypt.compare(password, user[0].password)
  return result
}
