'use strict'

const UnauthorizedException = use('App/Exceptions/UnauthorizedException')

/**
 * Check if user has the right to update this store
 */
class AuthorizeStoreAction {
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
  async handle ({ request, store, auth }, next) {
    if (store.user_id !== auth.user.id) {
      throw new UnauthorizedException('Unauthorized to make changes to this store.', 401)
    }

    await next()
  }
}

module.exports = AuthorizeStoreAction
