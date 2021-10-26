const { Router } = require('express')
const { transactionsRoutes } = require('./transaction.routes')
const { dashboardRoutes } = require('./dashboard.routes')

const router = Router()

router.use('/transactions', transactionsRoutes)
router.use('/dashboards', dashboardRoutes)

module.exports = { router }
