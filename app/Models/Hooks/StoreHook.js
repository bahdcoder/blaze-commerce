'use strict'

const uuid = require('uuid')

const StoreHook = exports = module.exports = {}

/**
 * Set store primary key to uuid.
 *
 * @method
 *
 * @param  {Object} storeInstance
 *
 * @return {void}
 */
StoreHook.setPrimaryKey = async (storeInstance) => {
  storeInstance.primaryKeyValue = uuid.v4()
}
