'use strict'

const User = use('App/Models/User')

class AuthController {
  async registerUser ({ request, response, auth }) {
    const user = await User.create({ ...request.all() })

    const token = await auth.generate(user)

    return response.json(token)
  }

  async loginUser ({ request, response, auth }) {
    try {
      const { email, password } = request.all()
      const token = await auth.attempt(email, password)

      return response.json(token)
    } catch (error) {
      if (error.name === 'PasswordMisMatchException') {
        return response.status(401).json({ message: 'These credentials do not match our records.' })
      } else {
        throw error
      }
    }
  }
}

module.exports = AuthController
