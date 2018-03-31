'use strict'

const Schema = use('Schema')

/**
 * The 'products' table schema
 */
class ProductSchema extends Schema {
  /**
   * Create products table
   * @method up
   *
   * @returns {void}
   */
  up () {
    this.create('products', (table) => {
      table.string('id')
      table.string('name').notNullable()
      table.string('store_id').notNullable()
      table.integer('price').notNullable()
      table.text('description').notNullable()
      table.bool('digital').defaultTo(false)
      table.timestamps()
    })
  }
  /**
   * drop products table
   * @method up
   *
   * @returns {void}
   */
  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
