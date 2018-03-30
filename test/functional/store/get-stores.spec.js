'use strict'

const User = use('App/Models/User')
const { test, trait } = use('Test/Suite')('Get Store')
const generateUser = require('../../helpers/generateUser')
const generateStore = require('../../helpers/generateStore')

trait('Auth/Client')
trait('Test/ApiClient')

test('user can get all their stores', async ({ assert, client }) => {
  const fakeStore = generateStore()

  const user = await User.create(generateUser())

  await user.stores().create(fakeStore)

  const response = await client.get('/stores')
    .loginVia(user, 'api').end()

  assert.equal(response.body.length, 1)
})

test('only authenticated users can get stores', async ({ assert, client }) => {
  const response = await client.get('/stores').end()

  response.assertStatus(401)

  response.assertJSON({
    message: 'The api token is missing or invalid.'
  })
})
