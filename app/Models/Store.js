'use strict'

const Model = use('Model')

/**
 * Store Model
 */
class Store extends Model {
  /**
   * Set incrementing to false
   * @returns {bool} false
   */
  static get incrementing () {
    return false
  }

  /**
   * Array of hidden
   * @returns {Array} hidden model fields
   */
  static get hidden () {
    return ['user_id', 'created_at', 'updated_at']
  }

  /**
   * Boot the model
   * @returns {void}
   */
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'StoreHook.setPrimaryKey')
  }
}

module.exports = Store
