'use strict'

const faker = require('faker')

const User = use('App/Models/User')
const Store = use('App/Models/Store')
const { test, trait } = use('Test/Suite')('Store Create')
const generateUser = require('../../helpers/generateUser')

trait('Auth/Client')
trait('Test/ApiClient')

test('a user can create a store', async ({ assert, client }) => {
  const fakeUser = generateUser()

  const fakeStore = {
    name: faker.lorem.words(2)
  }

  const user = await User.create(fakeUser)

  const response = await client.post('/stores')
    .loginVia(user, 'api')
    .send(fakeStore).end()

  response.assertStatus(201)

  response.assertJSONSubset({
    name: fakeStore.name
  })

  const {
    user_id: userId,
    created_at: createdAt,
    updated_at: updatedAt
  } = response.body

  assert.isUndefined(userId)
  assert.isUndefined(createdAt)
  assert.isUndefined(updatedAt)

  await Store.findByOrFail('name', fakeStore.name)
})

test('a user must be authenticated to create a store', async ({ assert, client }) => {
  const fakeStore = {
    name: faker.lorem.words(2)
  }

  const response = await client.post('/stores')
    .send(fakeStore).end()

  response.assertStatus(401)

  response.assertJSON({
    message: 'The api token is missing or invalid.'
  })

  const store = await Store.findBy('name', fakeStore.name)
  assert.isNull(store)
})

test('a store belongs to a user', async ({ assert, client }) => {
  const fakeUser = generateUser()

  const fakeStore = {
    name: faker.lorem.words(2)
  }

  const user = await User.create(fakeUser)

  await client.post('/stores').loginVia(user, 'api')
    .send(fakeStore).end()

  const userStores = (await user.stores().fetch()).toJSON()
  assert.equal(userStores.length, 1)
})
