import express from 'express'
import User from './users.model.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll()
    return res.send(users)
  } catch (err) {
    if (err.name == 'ReferenceError') {
      return res.send({ Error: 'The model is undefined' })
    }
  }
})

export default router
