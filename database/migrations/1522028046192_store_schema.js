'use strict'

const Schema = use('Schema')

/**
 * The 'stores' table schema
 */
class StoreSchema extends Schema {
  /**
   * Create stores table
   * @method up
   *
   * @returns {void}
   */
  up () {
    this.create('stores', (table) => {
      table.string('id')
      table.string('name')
      table.string('user_id')
      table.timestamps()
    })
  }
  /**
   * drop stores table
   * @method up
   *
   * @returns {void}
   */
  down () {
    this.drop('stores')
  }
}

module.exports = StoreSchema
