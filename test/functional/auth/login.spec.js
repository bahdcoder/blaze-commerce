'use strict'

const User = use('App/Models/User')
const { generateUser } = require('../../helpers/user')
const { test, trait } = use('Test/Suite')('User Personal access token generation')

trait('Test/ApiClient')

test('login a user and get personal access token', async ({ client, assert }) => {
  const fakeUser = generateUser()

  await User.create(fakeUser)

  const response = await client.post('/users/login')
    .send({ email: fakeUser.email, password: fakeUser.password })
    .end()

  response.assertStatus(200)
  response.assertJSONSubset({
    type: 'bearer'
  })

  assert.isDefined(response.body.token)
})

test('login a user requires email', async ({ client, assert }) => {
  const fakeUser = generateUser()

  const response = await client.post('/users/login')
    .send({ password: fakeUser.password })
    .end()

  response.assertStatus(400)

  response.assertJSON({
    errors: [{
      field: 'email',
      message: 'The email is required.'
    }]
  })
})

test('login failure returns a clear message', async ({ client, assert }) => {
  const fakeUser = generateUser()

  await User.create(fakeUser)

  const response = await client.post('/users/login')
    .send({ email: fakeUser.email, password: 'WRONG_PASSWORD' })
    .end()

  response.assertStatus(401)

  response.assertJSON({
    message: 'These credentials do not match our records.'
  })
})
