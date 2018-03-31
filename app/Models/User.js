'use strict'

const Model = use('Model')
const StoreNotFoundException = use('App/Exceptions/StoreNotFoundException')

/**
 * The User model
 */
class User extends Model {
  /**
   * Set incrementing to false
   * @returns {bool} false
   */
  static get incrementing () {
    return false
  }

  /**
   * Boot the model
   * @returns {void}
   */
  static boot () {
    super.boot()

    /**
     * A hook to hash the user password before saving
     * it to the database.
     */
    this.addHook('beforeCreate', 'User.hashPassword')

    /**
     * A hook to set the user primary key to uuid
     */
    this.addHook('beforeCreate', 'User.setPrimaryKey')
  }

  /**
   * A user has many tokens
   * @return {Object} relationship
   */
  tokens () {
    return this.hasMany('App/Models/Token')
  }

  /**
   * A user has many tokens
   * @return {Object} relationship
   */
  stores () {
    return this.hasMany('App/Models/Store')
  }

  /**
   * Finds the first store owned by this user.
   * Throws ModelNotFoundException if store was not found.
   * @param {String} message custom message for exception
   * @method firstStoreOrFail
   *
   * @throws {StoreNotFoundException} if a store was not found
   * @return {Object} instance of Store
   */
  async firstStoreOrFail (message = 'The store was not found.') {
    const firstStore = await this.stores().first()

    if (!firstStore) {
      throw new StoreNotFoundException(message, 400)
    }

    return firstStore
  }
}

module.exports = User
