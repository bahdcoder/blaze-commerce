'use strict'

/**
 * Controller in charge of /products endpoints
 */
class ProductController {
  /**
   * Get all products for a particular store
   * @method store
   *
   * @param {Object} context
   * @param {Object} context.auth
   * @param {Object} context.request
   * @param {Object} context.response
   *
   * @returns {Object} fetched products
   */
  async index () { }

  /**
   * Stores a new product for the user
   * @method store
   *
   * @param {Object} context
   * @param {Object} context.auth
   * @param {Object} context.request
   * @param {Object} context.response
   *
   * @returns {Object} newly created store
   */
  async store ({ auth, request, response }) {
    const store = await auth.user
      .firstStoreOrFail('No store was found. Please add a store before creating any products.')

    const product = await store.products().create({
      ...request.only(['name', 'description', 'price', 'digital'])
    })

    return response.json(product)
  }
  /**
   * Stores a new product for the user using the store id
   * @method store
   *
   * @param {Object} context
   * @param {Object} context.auth
   * @param {Object} context.request
   * @param {Object} context.response
   *
   * @returns {Object} newly created store
   */
  async storeByStoreId ({ auth, request, response, store }) {
    const product = await store.products()
      .create({ ...request.only(['name', 'description', 'price', 'digital']) })

    return response.json(product)
  }

  /**
   * Gets a single product
   * @method store
   *
   * @param {Object} context
   * @param {Object} context.auth
   * @param {Object} context.request
   * @param {Object} context.response
   *
   * @returns {Object} newly created store
   */
  async show () {
  }

  /**
 * Updates a product for the user
 * @method store
 *
 * @param {Object} context
 * @param {Object} context.auth
 * @param {Object} context.request
 * @param {Object} context.response
 *
 * @returns {Object} newly created store
 */
  async update () {
  }

  /**
 * Deletes a product for the user
 * @method store
 *
 * @param {Object} context
 * @param {Object} context.auth
 * @param {Object} context.request
 * @param {Object} context.response
 *
 * @returns {Object} confirmation of delete
 */
  async delete () {
  }
}

module.exports = ProductController
