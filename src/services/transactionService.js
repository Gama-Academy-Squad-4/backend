const { Transaction } = require('../models/transactionModel')
const { connect } = require('../../lib/database')
const { error } = require('../../lib/error')

const create = async (data) => {
  await connect()

  const transaction = new Transaction(data)

  const schemaValidationError = transaction.validateSync()

  if (schemaValidationError) {
    throw error.buildSchemaValidationError(schemaValidationError)
  }

  return transaction.save()
}

const update = async ({ id, ...body }) => {
  if (!id) {
    throw error.buildSchemaValidationError({
      message: 'O id da transação não foi informado'
    })
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(id, body, { new: true })

  if (!updatedTransaction) {
    throw error.buildTransactionNotFoundError(id)
  }

  return updatedTransaction
}

const findById = async (transactionId) => {
  const transaction = await Transaction.findById(transactionId)

  if (!transaction) {
    throw error.buildTransactionNotFoundError(transaction)
  }

  return transaction
}

const remove = async (transactionId) => {
  const removedTransaction = await Transaction.findByIdAndRemove(transactionId)

  if (!removedTransaction) {
    throw error.buildTransactionNotFoundError(transactionId)
  }

  return removedTransaction
}

const list = async ({
  value,
  amount,
  sort,
  page = 1,
  perPage = 50
}) => {
  page = Number(page)
  perPage = Number(perPage)

  const maxPages = Math.min(+perPage, 50)
  const skip = (+page - 1) * +perPage

  if (!sort) sort = 'createdAt'

  let filter = {}

  if (value) filter = { ...filter, value }

  if (amount) filter = { ...filter, amount }

  const transactionsCount = await Transaction.countDocuments(filter)

  const transactions = await Transaction.find(filter)
    .skip(skip)
    .limit(maxPages)
    .sort(sort)

  return { transactions, totalSize: transactionsCount }
}

const transactionService = {
  create,
  update,
  findById,
  remove,
  list
}

module.exports = {
  transactionService
}
