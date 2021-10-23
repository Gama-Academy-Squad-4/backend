const { User } = require('../models/userModel')
const { connect } = require('../../lib/database')
const { error } = require('../../lib/error')

const create = async (data) => {
  await connect()

  const user = new User(data)

  const schemaValidationError = user.validateSync()

  if (schemaValidationError) {
    throw error.buildSchemaValidationError(schemaValidationError)
  }

  return user.save()
}

const userService = {
  create
}

module.exports = {
  userService
}
