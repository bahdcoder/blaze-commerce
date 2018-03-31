'use strict'

const faker = require('faker')
const User = use('App/Models/User')
const { test, trait } = use('Test/Suite')('User registration')

trait('Test/ApiClient')

test('register a new user and get personal access token', async ({ client, assert }) => {
  const fakeUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  const response = await client.post('/users/register')
    .send(fakeUser).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    type: 'bearer'
  })

  assert.isDefined(response.body.token)
})

test('validate user\'s name before registration', async ({ client }) => {
  const fakeUser = {
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  const response = await client.post('/users/register')
    .send(fakeUser).end()

  response.assertStatus(400)

  response.assertJSON({
    errors: [{
      field: 'name',
      message: 'The name is required.'
    }]
  })
})

test('user\'s name should not be longer than 40 characters', async ({ client }) => {
  const fakeUser = {
    name: faker.lorem.paragraph(19),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  const response = await client.post('/users/register')
    .send(fakeUser).end()

  response.assertStatus(400)

  response.assertJSON({
    errors: [{
      field: 'name',
      message: 'The name must not be longer than 40 characters.'
    }]
  })
})

test('user\'s email should not be longer than 40 characters', async ({ client }) => {
  const fakeUser = {
    name: faker.lorem.words(2),
    email: `${faker.lorem.paragraph(10)}${faker.internet.email()}`,
    password: faker.internet.password()
  }

  const response = await client.post('/users/register')
    .send(fakeUser).end()

  response.assertStatus(400)

  response.assertJSON({
    errors: [{
      field: 'email',
      message: 'The email must not be longer than 40 characters.'
    }]
  })
})

test('validate user\'s email before registration', async ({ client }) => {
  const fakeUser = {
    name: faker.name.firstName(),
    password: faker.internet.password()
  }

  const response = await client.post('/users/register')
    .send(fakeUser).end()

  response.assertStatus(400)

  response.assertJSON({
    errors: [{
      field: 'email',
      message: 'The email is required.'
    }]
  })
})

test('validate user\'s email duplicate email before registration', async ({ client }) => {
  const fakeUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }

  await User.create(fakeUser)

  const response = await client.post('/users/register')
    .send(fakeUser).end()

  response.assertStatus(400)

  response.assertJSON({
    errors: [{
      field: 'email',
      message: 'The email has already been taken.'
    }]
  })
})
