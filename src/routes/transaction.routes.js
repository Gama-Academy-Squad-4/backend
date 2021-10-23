const { Router } = require('express')

const { createTransaction } = require('../handlers/transaction/createTransaction')
const { updateTransaction } = require('../handlers/transaction/updateTransaction')
const { getTransaction } = require('../handlers/transaction/getTransaction')
const { deleteTransaction } = require('../handlers/transaction/deleteTransaction')
const { listTransactions } = require('../handlers/transaction/listTransactions')

const transactionsRoutes = Router()

transactionsRoutes.post('/', createTransaction)
transactionsRoutes.put('/', updateTransaction)
transactionsRoutes.get('/:transactionId', getTransaction)
transactionsRoutes.delete('/:transactionId', deleteTransaction)
transactionsRoutes.get('/', listTransactions)

module.exports = { transactionsRoutes }
