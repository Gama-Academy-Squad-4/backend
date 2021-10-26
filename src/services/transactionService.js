const { Transaction } = require('../models/transactionModel')
const { connect } = require('../../lib/database')
const { error } = require('../../lib/error')
const { bitcoin } = require('../../lib/bitcoin')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')

const create = async (data) => {
  await connect()

  const transaction = new Transaction(data)

  const schemaValidationError = transaction.validateSync()

  if (schemaValidationError) {
    throw error.buildSchemaValidationError(schemaValidationError)
  }

  const amount = await getAmountBitcoin(transaction)

  transaction.amount = amount

  return transaction.save()
}

const getAmountBitcoin = async (transaction) => {
  const { value, transactionAt } = transaction

  const sameDay = moment().isSame(transactionAt, 'day')

  if (sameDay) {
    const { ticker } = await bitcoin.getRealTimeSummary()

    const amount = (1 * value / ticker.last).toFixed(5)

    return amount
  }

  const { closing: bitcoinCloseValue } = await bitcoin.getSummaryPerDay(transactionAt)

  const amount = (1 * value / bitcoinCloseValue).toFixed(5)

  return amount
}

const update = async ({ id, ...body }) => {
  await connect()

  if (!id) {
    throw error.buildSchemaValidationError({
      message: 'O id da transação não foi informado'
    })
  }

  if (!body.transactionAt) {
    throw error.buildSchemaValidationError({
      message: 'A data da transação não foi informado'
    })
  }

  if (!body.value) {
    throw error.buildSchemaValidationError({
      message: 'A valor da transação não foi informado'
    })
  }

  const amount = await getAmountBitcoin(body)

  const transaction = {
    ...body,
    amount
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(id, transaction, { new: true })

  if (!updatedTransaction) {
    throw error.buildTransactionNotFoundError(id)
  }

  return updatedTransaction
}

const findById = async (transactionId) => {
  await connect()

  const transaction = await Transaction.findById(transactionId)

  if (!transaction) {
    throw error.buildTransactionNotFoundError(transaction)
  }

  return transaction
}

const remove = async (transactionId) => {
  await connect()

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
  await connect()

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
    .lean()

  const handleTransactions = await calculateBitcoinVariation(transactions)

  return { transactions: handleTransactions, totalSize: transactionsCount }
}

const calculateBitcoinVariation = async (transactions) => {
  const { ticker } = await bitcoin.getRealTimeSummary()

  const handleTransactions = transactions.map(transaction => {
    const average = parseFloat((ticker.last / transaction.value - 1) * 100)

    const variationValue = parseFloat(transaction.value * average / 100)

    return {
      ...transaction,
      average,
      variationValue
    }
  })

  return handleTransactions
}

const transactionService = {
  create,
  update,
  findById,
  remove,
  list,
  calculateBitcoinVariation
}

module.exports = {
  transactionService
}
