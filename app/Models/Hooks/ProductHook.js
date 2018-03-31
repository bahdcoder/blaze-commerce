'use strict'

const uuid = require('uuid')

const ProductHook = exports = module.exports = {}

ProductHook.setPrimaryKey = async (productInstance) => {
  productInstance.primaryKeyValue = uuid.v4()
}
