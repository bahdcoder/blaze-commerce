const faker = require('faker')
const User = use('App/Models/User')
const { generateStore } = require('./store')

const generateUser = () => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

const createUser = async () => {
  const user = await User.create(generateUser())

  return user
}

const createUserWithStore = async () => {
  const user = await User.create(generateUser())

  const store = await user.stores().create(generateStore())

  return { user, store }
}

module.exports = {
  createUser, generateUser, createUserWithStore
}
