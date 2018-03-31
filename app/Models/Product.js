'use strict'

const Model = use('Model')

/**
 * Product Model
 */
class Product extends Model {
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
    return ['store_id', 'created_at', 'updated_at']
  }

  /**
   * Boot the model
   * @returns {void}
   */
  static boot () {
    super.boot()

    this.addHook('beforeCreate', 'ProductHook.setPrimaryKey')

    this.addTrait('@provider:Lucid/Slugify', {
      fields: {
        slug: 'name'
      },
      strategy: 'dbIncrement'
    })
  }
}

module.exports = Product
