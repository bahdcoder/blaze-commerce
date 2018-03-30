'use strict'

const User = use('App/Models/User')
/**
 * Handle authentication endpoints
 */
class AuthController {
  /**
   * Register a new user
   * @method registerUser
   *
   * @param {Object} context adonis context
   * @param {Object} context.auth
   * @param {Object} context.request
   * @param {Object} context.response
   *
   * @returns {Object} personal access token for user
   */
  async registerUser ({ request, response, auth }) {
    const user = await User.create({ ...request.all() })

    const token = await auth.generate(user)

    return response.json(token)
  }

  /**
   * Login a new user, and generate personal access token
   * @method registerUser
   *
   * @param {Object} context adonis context
   * @param {Object} context.auth
   * @param {Object} context.request
   * @param {Object} context.response
   *
   * @returns {Object} Personal access token for user
   */
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
