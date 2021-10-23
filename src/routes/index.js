const { Router } = require('express')
const { usersRoutes } = require('./user.routes')
const { transactionsRoutes } = require('./transaction.routes')

const router = Router()

router.use('/users', usersRoutes)
router.use('/transactions', transactionsRoutes)

module.exports = { router }
