const { connect } = require('../../lib/database')
const { bitcoin } = require('../../lib/bitcoin')

const getTransactionStatistics = async () => {
  await connect()

  const teste = await bitcoin.getCurrentBitcoin()

  console.log('bitcoin', teste)
}

const dashboardService = {
  getTransactionStatistics
}

module.exports = {
  dashboardService
}
