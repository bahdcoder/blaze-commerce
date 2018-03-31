'use strict'

const Store = use('App/Models/Store')
const UnauthorizedException = use('App/Exceptions/UnauthorizedException')
const StoreNotFoundException = use('App/Exceptions/StoreNotFoundException')

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

    const product = await store.products().create({ ...request.all() })

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
  async storeByStoreId ({ auth, request, response }) {
    const { storeId } = request.params
    const store = await Store.find(storeId)

    if (!store) {
      throw new StoreNotFoundException('The store was not found.', 404)
    }

    if (store.user_id !== auth.user.id) {
      throw new UnauthorizedException('Unauthorized to make changes to this store.', 401)
    }

    const product = await store.products().create({ ...request.all() })

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
