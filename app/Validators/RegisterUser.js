'use strict'

/**
 * Validator for user registration process
 */
class RegisterUser {
  /**
   * Define validation rules
   *
   * @returns {Object} rules for validation
   */
  get rules () {
    return {
      'name': 'required|string',
      'email': 'required|unique:users',
      'password': 'required|min:6|max:30'
    }
  }
  /**
   * Define custom validation messages
   *
   * @returns {Object} custom validation messages
   */
  get messages () {
    return {
      'required': 'The {{ field }} is required.',
      'email.unique': 'The email has already been taken.'
    }
  }

  /**
   * Handle validation failures
   * @param {Array} errorMessages the validation error messages
   *
   * @returns {Object} validation errors
   */
  async fails (errorMessages) {
    const formattedErrorMessages = errorMessages.map(message => ({
      message: message.message,
      field: message.field
    }))
    return this.ctx.response.status(400).send({ errors: formattedErrorMessages })
  }
}

module.exports = RegisterUser
