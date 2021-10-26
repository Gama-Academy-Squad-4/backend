global.TextEncoder = require('util').TextEncoder
global.TextDecoder = require('util').TextDecoder
require('dotenv').config()

const mongoose = require('mongoose')

let MONGO_DB_URI = process.env.URL_MONGODB

const defaultConnectionConfig = {
  ignoreUndefined: true
}

const connect = async () => {
  try {
    if (mongoose.connection.readyState === 1) return mongoose.connection

    /* istanbul ignore next */
    if (process.env.NODE_ENV === 'test') {
      const { MongoMemoryServer } = require('mongodb-memory-server')
      const mongod = new MongoMemoryServer()
      MONGO_DB_URI = await mongod.getUri()
    }

    return mongoose.connect(
      MONGO_DB_URI,
      defaultConnectionConfig
    )
  } catch (error) {
    console.log(error)
    throw error
  }
}

const validationMessage = (fieldName) => `O campo ${fieldName} é obrigatório`

module.exports = {
  connect,
  validationMessage
}
