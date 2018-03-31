'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

/**
 * Exception for unauthorized actions
 */
class UnauthorizedException extends LogicalException {
  /**
   * Handle this exception by itself
   * @returns {void}
   */
  handle () {}
}

module.exports = UnauthorizedException
