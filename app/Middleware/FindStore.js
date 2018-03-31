'use strict'

const Store = use('App/Models/Store')
const StoreNotFoundException = use('App/Exceptions/StoreNotFoundException')

/**
 * Find a specific store and set it on context
 */
class FindStore {
  /**
   * Handles incoming request
   *
   * @param {Object} context
   * @param {Object} context.request
   * @param {Function} next
   *
   * @throws {StoreNotFoundException} If store is not found.
   * @returns {void} calls next
   */
  async handle (context, next) {
    const { request } = context
    const { storeId } = request.params
    const store = await Store.find(storeId)

    if (!store) {
      throw new StoreNotFoundException('The store was not found.', 404)
    }

    context.store = store
    await next()
  }
}

module.exports = FindStore
