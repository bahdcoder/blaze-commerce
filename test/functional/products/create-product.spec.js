'use strict'

const faker = require('faker')
const Product = use('App/Models/Product')
const { createStore } = require('../../helpers/store')
const { test, trait } = use('Test/Suite')('Create Products')
const { generateProduct } = require('../../helpers/product')
const { createUserWithStore, createUser } = require('../../helpers/user')

trait('Auth/Client')
trait('Test/ApiClient')

test('a user can create a product', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const { user } = await createUserWithStore()

  const response = await client.post('/products')
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: fakeProduct.name,
    description: fakeProduct.description,
    price: fakeProduct.price,
    digital: fakeProduct.digital
  })
})

test('a user must provide price of product before creating a new one', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const { user } = await createUserWithStore()

  delete fakeProduct.price

  const response = await client.post('/products')
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      field: 'price',
      message: 'The price field is required.'
    }]
  })
})

test('the price must be a number when creating a product', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const { user } = await createUserWithStore()

  fakeProduct.price = 'STRING'

  const response = await client.post('/products')
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      field: 'price',
      message: 'The price field must be a number.'
    }]
  })
})

test('the name must be provided to create a product', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const { user } = await createUserWithStore()

  delete fakeProduct.name

  const response = await client.post('/products')
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      field: 'name',
      message: 'The name field is required.'
    }]
  })
})

test('the description must be provided to create a product', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const { user } = await createUserWithStore()

  delete fakeProduct.description

  const response = await client.post('/products')
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      field: 'description',
      message: 'The description field is required.'
    }]
  })
})

test('the digital field must be provided to create a product', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const { user } = await createUserWithStore()

  delete fakeProduct.digital

  const response = await client.post('/products')
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      field: 'digital',
      message: 'The digital field is required.'
    }]
  })
})

test('the name field must not be longer than 255 characters', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const { user } = await createUserWithStore()

  fakeProduct.name = faker.lorem.paragraphs(10)

  const response = await client.post('/products')
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      field: 'name',
      message: 'The name field must not be longer than 255 characters.'
    }]
  })
})

test('the description field must not be longer than 255 characters', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const { user } = await createUserWithStore()

  fakeProduct.description = faker.lorem.paragraphs(10)

  const response = await client.post('/products')
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      field: 'description',
      message: 'The description field must not be longer than 255 characters.'
    }]
  })
})

test('the digital field for creating a product must be a boolean', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const { user } = await createUserWithStore()

  fakeProduct.digital = 'STRING'

  const response = await client.post('/products')
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(400)
  response.assertJSONSubset({
    errors: [{
      field: 'digital',
      message: 'The digital field must be a boolean.'
    }]
  })
})

test('error message is returned if the user has no store', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const user = await createUser()

  const response = await client.post('/products')
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(400)
  response.assertJSON({
    message: 'No store was found. Please add a store before creating any products.'
  })
})

test('if user provides store in url, that store should be used', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const { user } = await createUserWithStore()

  const store = await createStore(user)

  const response = await client.post(`/stores/${store.id}/products`)
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(200)
  response.assertJSONSubset({
    name: fakeProduct.name,
    description: fakeProduct.description,
    price: fakeProduct.price,
    digital: fakeProduct.digital
  })

  const product = await Product.find(response.body.id)
  assert.equal(product.store_id, store.id)
})

test('if user provides store in url, user should be owner of the store', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const { user } = await createUserWithStore()

  const { store: secondUserStore } = await createUserWithStore()

  const response = await client.post(`/stores/${secondUserStore.id}/products`)
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(401)
  response.assertJSON({
    message: 'Unauthorized to make changes to this store.'
  })
})

test('if user provides store in url, and store is not found, user should recieve informative message', async ({ assert, client }) => {
  const fakeProduct = await generateProduct()
  const user = await createUser()

  const response = await client.post(`/stores/INVALID_STORE_ID/products`)
    .loginVia(user, 'api').send(fakeProduct).end()

  response.assertStatus(404)
  response.assertJSON({
    message: 'The store was not found.'
  })
})
