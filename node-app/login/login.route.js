import express from 'express'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import * as service from './login.service.js'

const router = express.Router()

dotenv.config()

router.post('/', async (req, res, next) => {
  try {
    const userId = await service.findUserId(req.body.username)
    req.userId = userId
    next()
  } catch (err) {
    return res.status(401).send({ Error: 'username / password is invalid' })
  }
})

router.post('/', async (req, res) => {
  const password = req.body.password

  if (await service.comparePassword(password)) {
    const token = jwt.sign(
      { id: req.userId, username: req.body.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )
    return res.send(token)
  }

  res.status(401).send({ Error: 'username / password is invalid' })
})

export default router
