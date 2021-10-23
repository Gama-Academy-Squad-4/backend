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

// const memoryDatabases = []

// const connect = async () => {
//   const isAlreadyConnected = connection.readyState === 1
//   if (isAlreadyConnected) {
//     return connection
//   }

//   const mongoConfig = {
//     ignoreUndefined: true
//   }

//   if (process.env.NODE_ENV === 'test') {
//     const { MongoMemoryServer } = require('mongodb-memory-server')
//     const memoryServer = new MongoMemoryServer({
//       instance: {
//         dbName: 'localhost-memory-database-for-tests',
//         port: 27017
//       }
//     })

//     const databaseURL = await memoryServer.getUri()

//     memoryDatabases.push(memoryServer)
//     return dbConnect(databaseURL, mongoConfig)
//   }

//   return dbConnect(MONGO_DB_URI, mongoConfig)
// }

// const disconnect = async () => {
//   await dbDisconnect()

//   if (process.env.NODE_ENV === 'test') {
//     for (const db of memoryDatabases) {
//       await db.stop()
//     }
//   }
// }

// const validationMessage = (fieldName) => `O campo ${fieldName} é obrigatório`

// const Defaults = {
//   validationMessage
// }

// module.exports = {
//   connect,
//   Defaults,
//   disconnect
// }
