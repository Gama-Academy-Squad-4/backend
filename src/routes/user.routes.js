const { Router } = require('express')

const { createUser } = require('../handlers/user/createUser')

const usersRoutes = Router()

usersRoutes.post('/', (request, response) => {
  return createUser(request, response)
})

module.exports = { usersRoutes }
