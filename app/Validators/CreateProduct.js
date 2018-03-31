'use strict'

/**
 * CreateProduct validator
 */
class CreateProduct {
  /**
   * Define validation rules
   *
   * @returns {Object} rules for validation
   */
  get rules () {
    return {
      'price': 'required|number',
      'name': 'required|string|max:255',
      'description': 'required|string|max:255',
      'digital': 'required|boolean'
    }
  }

  /**
   * Define custom validation messages
   *
   * @returns {Object} custom validation messages
   */
  get messages () {
    return {
      'required': 'The {{ field }} field is required.',
      'number': 'The {{ field }} field must be a number.',
      'boolean': 'The {{ field }} field must be a boolean.',
      'name.max': 'The name field must not be longer than 255 characters.',
      'description.max': 'The description field must not be longer than 255 characters.'
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

module.exports = CreateProduct
