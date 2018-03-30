'use strict'

const Hash = use('Hash')
const uuid = require('uuid')

const UserHook = module.exports = {}

/**
 * Hash using password as a hook.
 *
 * @method
 *
 * @param  {Object} userInstance
 *
 * @return {void}
 */
UserHook.hashPassword = async (userInstance) => {
  if (userInstance.password) {
    userInstance.password = await Hash.make(userInstance.password)
  }
}

/**
 * Set user primary key to uuid.
 *
 * @method
 *
 * @param  {Object} userInstance
 *
 * @return {void}
 */
UserHook.setPrimaryKey = async (userInstance) => {
  userInstance.primaryKeyValue = uuid.v4()
}
