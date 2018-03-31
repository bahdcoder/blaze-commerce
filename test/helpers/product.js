const faker = require('faker')

const generateProduct = () => ({
  name: faker.lorem.words(3),
  description: faker.lorem.words(4),
  price: faker.random.number(),
  digital: faker.random.boolean()
})

module.exports = {
  generateProduct
}
