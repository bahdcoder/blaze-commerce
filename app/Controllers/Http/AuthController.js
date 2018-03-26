'use strict'

const User = use('App/Models/User')

class AuthController {
  async registerUser ({ request, response, auth }) {
    const user = await User.create({ ...request.all() })

    const token = await auth.generate(user)

    return response.json(token)
  }
}

module.exports = AuthController
