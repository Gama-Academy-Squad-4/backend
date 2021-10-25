const { Router } = require('express')

const { getStatistics } = require('../handlers/dashboard/getStatistics')

const dashboardRoutes = Router()

dashboardRoutes.get('/', getStatistics)

module.exports = { dashboardRoutes }
