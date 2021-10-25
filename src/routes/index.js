const { Router } = require('express')
const { usersRoutes } = require('./user.routes')
const { transactionsRoutes } = require('./transaction.routes')
const { dashboardRoutes } = require('./dashboard.routes')

const router = Router()

router.use('/users', usersRoutes)
router.use('/transactions', transactionsRoutes)
router.use('/dashboards', dashboardRoutes)

module.exports = { router }
