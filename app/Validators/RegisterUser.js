'use strict'

class RegisterUser {
  get rules () {
    return {
      'name': 'required|string',
      'email': 'required|unique:users',
      'password': 'required|min:6|max:30'
    }
  }

  get messages () {
    return {
      'required': 'The {{ field }} is required.',
      'email.unique': 'The email has already been taken.'
    }
  }

  async fails (errorMessages) {
    const formattedErrorMessages = errorMessages.map(message => ({
      message: message.message,
      field: message.field
    }))
    return this.ctx.response.status(400).send({ errors: formattedErrorMessages })
  }
}

module.exports = RegisterUser
