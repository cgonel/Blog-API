import * as service from '../posts/posts.service.js'
import assert from 'assert'
import app from '../index.js'
import request from 'supertest'
import dotenv from 'dotenv'

dotenv.config()

const username = 'Bret'
const password = process.env.USERS_PASS
const postDoOwn = 1
const postDontOwn = 50

describe('route PATCH /posts/:id unit tests', () => {
  it('Should be able to update a post you own', async () => {
    const post = await service.editPost('title', 'body', 5)
    assert.equal(post, 1)
  })
})

describe('route PATCH /posts/:id end to end tests', () => {
  let token
  before((done) => {
    request(app)
      .post('/login')
      .send({ username: username, password: password })
      .end((err, res) => {
        if (err) return done(err)
        token = res.text
        done()
      })
  })
  it('Should be able to update a post you own', (done) => {
    request(app)
      .patch(`/posts/${postDoOwn}`)
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        if (err) return done(err)
        assert.equal(res.status, 200)
        done()
      })
  })
  it("Should not be able to update a post which you don't own and return appropriate error code", (done) => {
    request(app)
      .patch(`/posts/${postDontOwn}`)
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        if (err) return done(err)
        assert.equal(res.status, 403)
        assert.equal(
          res.text,
          'Unauthorized action: only the author can modify their post'
        )
        done()
      })
  })
  it('Should not be able to update a post if not authenticated and return appropriate error code', (done) => {
    request(app)
      .patch('/posts/1')
      .end((err, res) => {
        if (err) return done(err)
        assert.equal(res.status, 401)
        assert.equal(res.text, '{"Error":"Please login to continue"}')
        return done()
      })
  })
})
