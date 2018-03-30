'use strict'

const Model = use('Model')

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
}

module.exports = User
