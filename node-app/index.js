import express from 'express'
import dotenv from 'dotenv'
import jwt from 'express-jwt'
import './database/connection.js'
import loginRouter from './login/login.route.js'
// import './users/users.model.js'
import userRouter from './users/users.route.js'
// import './users/users.seeder.js'
// import './posts/posts.model.js'
// import './comments/comments.model.js'
import postRouter from './posts/posts.route.js'

const app = express()

dotenv.config()

app.use(express.json())

app.use(
  jwt({ secret: process.env.JWT_SECRET, algorithms: ['HS256'] }).unless({
    path: ['/login', '/users']
  })
)

app.use('/login', loginRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)

app.use((err, req, res, next) => {
  if (err.name == 'UnauthorizedError') {
    return res.status(401).send({ Error: 'Please login to continue' })
  }
  next()
})

app.listen(process.env.PORT || 3000)

export default app
