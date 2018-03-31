'use strict'

const Schema = use('Schema')

/**
 * The 'users' table schema
 */
class UserSchema extends Schema {
  /**
   * Create users table
   * @method up
   *
   * @returns {void}
   */
  up () {
    this.create('users', table => {
      table.string('id')
      table.string('name', 80).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.timestamps()
    })
  }

  /**
   * Drop users table
   * @method down
   *
   * @returns {void}
   */
  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
