const faker = require('faker')

module.exports = () => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
