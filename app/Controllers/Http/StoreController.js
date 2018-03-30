'use strict'

/**
 * Handle the /stores endpoints
 */
class StoreController {
  /**
   * Get all stores for a user
   * @method index
   *
   * @param {Object} context adonis context
   * @param {Object} context.auth
   * @param {Object} context.response
   *
   * @returns {Array} array of stores
   */
  async index ({ auth, response }) {
    const stores = (await auth.user.stores().fetch()).toJSON()

    return response.json(stores)
  }

  /**
   * Create a new store
   * @method store
   *
   * @param {Object} context
   * @param {Object} context.auth
   * @param {Object} context.request
   * @param {Object} context.response
   *
   * @returns {Object} newly created store
   */
  async store ({ request, response, auth }) {
    const store = await auth.user.stores().create({
      name: request.all().name
    })

    return response.status(201).json(store)
  }

  /**
   * Create a new store
   * @param {Object} context
   * @returns {Object} get a specific store
   */
  async show () {}

  /**
   * Update store details
   * @param {Object} context
   * @returns {Object} updated store
   */
  async update () {}

  /**
   * Delete a store
   * @param {Object} context
   * @returns {Object} newly created store
   */
  async delete () {}
}

module.exports = StoreController
