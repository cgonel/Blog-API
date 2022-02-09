import express from 'express'
import * as service from './posts.service.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const posts = await service.findPostsByUserId(req.user.id)
    return res.send(posts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const post = await service.findPostByUserIdAndPostId(
      req.user.id,
      req.params.id
    )
    if (post.length == 0) {
      throw {
        name: 'noPost',
        message: "This post doesn't exist"
      }
    }
    return res.send(post)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await service.findPostsComments(req.params.id)
    return res.send(comments)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const post = await service.createPost(
      req.user.id,
      req.body.title,
      req.body.body
    )
    return res.send(`Post "${post.title}" was created.`)
  } catch (err) {
    next(err)
  }
})

router.post('/:id/comments', async (req, res, next) => {
  try {
    const comment = await service.createComment(
      req.params.id,
      req.body.name,
      req.body.email,
      req.body.body
    )
    return res.send(`Your comment "${comment.name}" was posted.`)
  } catch (err) {
    next()
  }
})

router.patch('/:id', async (req, res, next) => {
  const post = await service.findPostById(req.params.id)

  if (post.userId != req.user.id) {
    return res
      .status(403)
      .send('Unauthorized action: only the author can modify their post')
  }
  next()
})

router.patch('/:id', async (req, res, next) => {
  try {
    await service.editPost(req.body.title, req.body.body, req.params.id)
    return res.send(`Your post was edited`)
  } catch (err) {
    next(err)
  }
})

router.patch('/:postId/comments/:commentId', async (req, res, next) => {
  try {
    const comment = await service.editComment(
      req.body.name,
      req.body.email,
      req.body.body,
      req.params.commentId,
      req.params.id
    )
    if (comment[0] == 0) {
      throw {
        name: 'noComment',
        message: "The comment doesn't exist"
      }
    }
    return res.send('Your comment was edited')
  } catch (err) {
    next(err)
  }
})

router.delete('/:postId/comments/:commentId', async (req, res, next) => {
  try {
    const comment = await service.deleteComment(
      req.params.postId,
      req.params.commentId
    )
    if (comment == 0) {
      throw {
        name: 'noComment',
        message: "The comment doesn't exist"
      }
    }
    return res.send('The comment was deleted.')
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => {
  if (err.name == 'ReferenceError') {
    return res.status(500).send({ 'Server Error': 'Model is undefined' })
  }
  if (err.name == 'noComment') {
    return res.status(500).send(err.message)
  }
  if (err.name == 'noPost') {
    return res.status(500).send(err.message)
  }
  next()
})

export default router
