'use strict'

const Schema = use('Schema')

/**
 * The 'tokens' table schema
 */
class TokensSchema extends Schema {
  /**
   * Create tokens table
   * @method up
   *
   * @returns {void}
   */
  up () {
    this.create('tokens', table => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.string('token', 40).notNullable().unique()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }
  /**
   * Drop tokens table
   * @method down
   *
   * @returns {void}
   */
  down () {
    this.drop('tokens')
  }
}

module.exports = TokensSchema
