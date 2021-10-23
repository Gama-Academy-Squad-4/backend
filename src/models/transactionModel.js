const { CollectionsEnum } = require('../enums/CollectionsEnum')
const { validationMessage } = require('../../lib/database')
const mongoose = require('mongoose')

const { Schema } = mongoose

const TransactionSchema = new Schema({
  value: {
    type: Number,
    required: [true, validationMessage('valor')]
  },
  amount: {
    type: Number,
    required: [true, validationMessage('quantidade')]
  },
  transactionAt: {
    type: Date,
    required: [true, validationMessage('data da transação')]
  }
}, {
  timestamps: true
})

const Transaction = mongoose.model(CollectionsEnum.Transactions, TransactionSchema, CollectionsEnum.Transactions)

module.exports = {
  Transaction
}
