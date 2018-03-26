'use strict'

const faker = require('faker')
const User = use('App/Models/User')
const { test, trait } = use('Test/Suite')('User')

trait('Test/ApiClient')

test('login a user and get personal access token', async ({ client, assert }) => {
  const fakeUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

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
  const fakeUser = {
    password: faker.internet.password()
  }

  const response = await client.post('/users/login')
    .send(fakeUser)
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
  const fakeUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  await User.create(fakeUser)

  const response = await client.post('/users/login')
    .send({ email: fakeUser.email, password: faker.internet.password() })
    .end()

  response.assertStatus(401)

  response.assertJSON({
    message: 'These credentials do not match our records.'
  })
})
