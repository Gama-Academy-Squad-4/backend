const mongoose = require('mongoose')

const reset = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}

module.exports = {
  reset
}
