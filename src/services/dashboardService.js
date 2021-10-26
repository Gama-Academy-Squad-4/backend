const { connect } = require('../../lib/database')
const { bitcoin } = require('../../lib/bitcoin')
const { transactionService } = require('./transactionService')
const { Transaction } = require('../models/transactionModel')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')

const getTransactionsStatistics = async () => {
  await connect()

  const { ticker } = await bitcoin.getRealTimeSummary()

  const transactions = await Transaction.find().lean()

  const handleTransactions = await transactionService.calculateBitcoinVariation(transactions)

  const consolidate = await transactionsConsolidate(handleTransactions)

  const { totalWeek, totalMounth } = await periodConsolidate(handleTransactions)

  const { consolidateWeek } = await getConsolidateWeek(handleTransactions)

  const btcNow = {
    valueNow: ticker.last,
    hight: ticker.high,
    low: ticker.low
  }

  return {
    btcNow,
    consolidate,
    totalWeek,
    totalMounth,
    consolidateWeek
  }
}

const getConsolidateWeek = async (transactions) => {
  const startDate = moment().subtract(7, 'd')

  const lastSevenDays = await Transaction.find({
    transactionAt: { $gt: startDate }
  }).lean()

  console.log('lastSevenDays', lastSevenDays)

  if (lastSevenDays && lastSevenDays.length) {
    const handleTransactions = await transactionService.calculateBitcoinVariation(lastSevenDays)

    const consolidadeTransactions = []
    if (handleTransactions && handleTransactions.length) {
      handleTransactions.forEach(transactionWeek => {
        const date = moment(transactionWeek.transactionAt, 'YYYY/MM/DD')

        const transactionWeekDay = date.format('D')

        const [transaction] = consolidadeTransactions.filter(transaction => {
          const date = moment(transaction.transactionAt, 'YYYY/MM/DD')

          const transactionDay = date.format('D')

          return transactionDay === transactionWeekDay
        })

        if (!transaction) {
          consolidadeTransactions.push({
            transactionAt: transactionWeek.transactionAt,
            totalValue: transactionWeek.value + transactionWeek.variationValue
          })
        } else {
          const totalValue = transactionWeek.value + transactionWeek.variationValue
          transaction.totalValue += totalValue
        }
      })
    }

    return {
      consolidateWeek: consolidadeTransactions
    }
  }
}

const periodConsolidate = async (transactions) => {
  const week = transactions.filter(transaction => moment(transaction.transactionAt).isSame(new Date(), 'week'))

  const mounth = transactions.filter(transaction => moment(transaction.transactionAt).isSame(new Date(), 'month'))

  let totalWeek = null
  let totalMounth = null

  if (week && week.length) {
    const totalInvested = week.reduce((acc, transaction) => {
      const total = transaction.value
      return (acc = acc + total)
    }, 0)

    const totalProfit = week.reduce((acc, transaction) => {
      const total = transaction.variationValue
      return Math.floor((acc = acc + total))
    }, 0)

    const totalBalance = totalInvested + totalProfit

    const totalAvarage = parseFloat((totalBalance / totalInvested - 1) * 100).toFixed(2)

    totalWeek = {
      totalBalance,
      totalAvarage
    }
  }

  if (mounth && mounth.length) {
    const totalInvested = mounth.reduce((acc, transaction) => {
      const total = transaction.value
      return (acc = acc + total)
    }, 0)

    const totalProfit = mounth.reduce((acc, transaction) => {
      const total = transaction.variationValue
      return Math.floor((acc = acc + total))
    }, 0)

    const totalBalance = totalInvested + totalProfit

    const totalAvarage = parseFloat((totalBalance / totalInvested - 1) * 100).toFixed(2)

    totalMounth = {
      totalBalance,
      totalAvarage
    }
  }

  return {
    totalWeek,
    totalMounth
  }
}

const transactionsConsolidate = async (transactions) => {
  const totalInvested = transactions.reduce((acc, transaction) => {
    const total = transaction.value
    return (acc = acc + total)
  }, 0)

  const totalProfit = transactions.reduce((acc, transaction) => {
    const total = transaction.variationValue
    return Math.floor((acc = acc + total))
  }, 0)

  const totalBalance = totalInvested + totalProfit

  const consolidate = {
    totalInvested,
    totalBalance,
    totalProfit
  }

  return consolidate
}

const dashboardService = {
  getTransactionsStatistics
}

module.exports = {
  dashboardService
}
