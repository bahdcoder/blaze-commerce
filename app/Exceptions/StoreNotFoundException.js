'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

/**
 * The Store was not found exception
 */
class StoreNotFoundException extends LogicalException {
  /**
   * Handle this exception by itself
   * @param {Object} error the exception
   * @param {Object} context
   * @param {Object} context.response
   *
   * @returns {void}
   */
  async handle (error, { response }) {
    response.status(error.status).send({ message: error.message })
  }
}

module.exports = StoreNotFoundException
