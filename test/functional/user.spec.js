'use strict'

const User = use('App/Models/User')
const { test, trait } = use('Test/Suite')('User')

trait('Test/ApiClient')

test('get list of users', async ({ client }) => {
  await User.create({
    username: 'bahdcoder',
    email: 'bahdcoder@mail.com',
    password: 'password'
  })

  const response = await client.get('/travis-test').end()

  response.assertStatus(200)
  response.assertJSONSubset({
    users: [{
      username: 'bahdcoder',
      email: 'bahdcoder@mail.com',
    }]
  })
})
