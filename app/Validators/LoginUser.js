'use strict'

class LoginUser {
  get rules () {
    return {
      'email': 'required|email',
      'password': 'required'
    }
  }

  get messages () {
    return {
      'required': 'The {{ field }} is required.'
    }
  }

  async fails (errorMessages) {
    const errors = errorMessages.map(message => ({
      message: message.message,
      field: message.field
    }))

    this.ctx.response.status(400).json({ errors })
  }
}

module.exports = LoginUser
