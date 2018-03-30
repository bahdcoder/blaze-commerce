const faker = require('faker')

module.exports = () => ({
  name: faker.lorem.words(3)
})
