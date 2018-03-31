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
      table.string('name').notNullable()
      table.string('user_id').notNullable()
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
