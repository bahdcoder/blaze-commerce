const faker = require('faker')

const generateStore = () => ({
  name: faker.lorem.words(3)
})

const createStore = async (user) => {
  const store = await user.stores().create(generateStore())

  return store
}

module.exports = {
  generateStore, createStore
}
