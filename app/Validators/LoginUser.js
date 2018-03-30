'use strict'

/**
 * Validator for user login process
 */
class LoginUser {
  /**
   * Define validation rules
   *
   * @returns {Object} rules for validation
   */
  get rules () {
    return {
      'email': 'required|email',
      'password': 'required'
    }
  }

  /**
   * Define custom validation messages
   *
   * @returns {Object} custom validation messages
   */
  get messages () {
    return {
      'required': 'The {{ field }} is required.'
    }
  }

  /**
   * Handle validation failures
   * @param {Array} errorMessages the validation error messages
   *
   * @returns {Object} validation errors
   */
  async fails (errorMessages) {
    const errors = errorMessages.map(message => ({
      message: message.message,
      field: message.field
    }))

    this.ctx.response.status(400).json({ errors })
  }
}

module.exports = LoginUser
