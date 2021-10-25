const axios = require('axios')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')
const { error } = require('./error')

axios.defaults.timeout = Number(process.env.TIMEOUT_CONNECT_BITCOIN_API) || 5000

const getSummaryPerDay = async (transactionAt) => {
  try {
    const date = moment(transactionAt, 'YYYY/MM/DD')

    const year = date.format('YYYY')
    const month = date.format('M')
    const day = date.format('D')

    const { data: response } = await axios({
      method: 'GET',
      url: `https://www.mercadobitcoin.net/api/BTC/day-summary/${year}/${month}/${day}/`
    })

    return response
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      throw error.buildTimeoutConnectBitcoinApiError()
    } else {
      throw error.buildConnectBitcoinApiError()
    }
  }
}

const getRealTimeSummary = async () => {
  try {
    const { data: response } = await axios({
      method: 'GET',
      url: 'https://www.mercadobitcoin.net/api/BTC/ticker/'
    })

    return response
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      throw error.buildTimeoutConnectBitcoinApiError()
    } else {
      throw error.buildConnectBitcoinApiError()
    }
  }
}

const bitcoin = {
  getSummaryPerDay,
  getRealTimeSummary
}

module.exports = {
  bitcoin
}
