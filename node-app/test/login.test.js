import * as service from '../login/login.service.js'
import assert from 'assert'
import dotenv from 'dotenv'
import request from 'supertest'
import app from '../index.js'

dotenv.config()

const username = 'Bret'
const password = process.env.USERS_PASS
const wrongUsername = 'wrongUsername'
const wrongPassword = 'wrongPassword'

describe('route POST /login unit tests', () => {
  it('Should be able to login with correct credentials', async () => {
    const match = await service.comparePassword(process.env.USERS_PASS)
    assert.equal(match, true)
  })
  it('Should not be able to login with incorrect username', async () => {
    let result
    try {
      result = await service.findUserId(wrongUsername)
    } catch (err) {
      result = 'wrong username'
    }
    assert.equal(result, 'wrong username')
  })
  it('Should not be able to login with incorrect password', async () => {
    const match = await service.comparePassword(wrongPassword)
    assert.equal(match, false)
  })
})

describe('route POST /login end to end tests', () => {
  it('Should be able to login with correct credentials and return a token', (done) => {
    request(app)
      .post('/login')
      .send({ username: username, password: password })
      .end((err, res) => {
        if (err) return done(err)
        assert.equal(res.status, 200)
        assert.notEqual(res.text, '{"Error":"username / password is invalid"}')
        return done()
      })
  })
  it('Should not be able to login with incorrect username and return appropriate error code', (done) => {
    request(app)
      .post('/login')
      .send({ username: wrongUsername, password: password })
      .end((err, res) => {
        if (err) return done(err)
        assert.equal(res.status, 401)
        assert.equal(res.text, '{"Error":"username / password is invalid"}')
        return done()
      })
  })
  it('Should not be able to login with incorrect password and return appropriate error code', (done) => {
    request(app)
      .post('/login')
      .send({ username: username, password: wrongPassword })
      .end((err, res) => {
        if (err) return done(err)
        assert.equal(res.status, 401)
        assert.equal(res.text, '{"Error":"username / password is invalid"}')
        return done()
      })
  })
})
