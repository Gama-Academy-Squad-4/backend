const express = require('express')
const cors = require('cors')
const { router } = require('./routes')

const app = express()

app.use(express.json({ strict: false, limit: '50mb' }))

app.use(cors())

app.use(router)

module.exports = {
  app
}
