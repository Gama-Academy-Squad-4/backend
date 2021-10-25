const { connect } = require('../../../lib/database')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')
const { reset } = require('../../../lib/test')
const request = require('supertest')
const app = require('../../app').app
const { transactionService } = require('../../services/transactionService')
const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

const createAxiosMock = async (mock) => {
  const bitcoinSummary = {
    date: '2021-10-15',
    opening: 262.99999,
    closing: 269000,
    lowest: 260.00002,
    highest: 269,
    volume: 7253.13363567,
    quantity: 27.11390588,
    amount: 28,
    avg_price: 267.50604165
  }

  mock.onGet('https://www.mercadobitcoin.net/api/BTC/day-summary/2021/10/15/').reply(200, bitcoinSummary)

  const realTimeBitcoinSummary = {
    ticker: {
      high: '359854.78000000',
      low: '340300.00000000',
      vol: '49.22258512',
      last: '357999.99768000',
      buy: '357500.00010000',
      sell: '357999.99729000',
      open: '344653.94951000',
      date: 1635162943
    }
  }

  mock.onGet('https://www.mercadobitcoin.net/api/BTC/ticker/').reply(200, realTimeBitcoinSummary)
}

const createTransactions = async () => {
  await transactionService.create({
    value: 150000,
    transactionAt: moment()
  })

  await transactionService.create({
    value: 380000,
    transactionAt: moment('2021-10-15')
  })

  await transactionService.create({
    value: 345000,
    transactionAt: moment('2021-10-15')
  })

  await transactionService.create({
    value: 346017,
    transactionAt: moment('2021-10-15')
  })
}

describe('integration:listTransactions', () => {
  let mock = null

  beforeAll(async () => {
    mock = new MockAdapter(axios)

    await connect()

    await createAxiosMock(mock)
    await createTransactions()
  })

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500))
    await reset()
  })

  it('should return 200 and Transaction list', async () => {
    // arrange

    // act

    const response = await request(app).get('/transactions')

    // assert
    const list = response.body.transactions

    const [transaction] = list.transactions

    expect(response.statusCode).toBe(200)
    expect(list.transactions.length).toBeGreaterThanOrEqual(4)
    expect(transaction.average).toBeDefined()
    expect(transaction.variationValue).toBeDefined()
  })

  it('should return 200 and Transaction by value', async () => {
    // arrange

    // act

    const response = await request(app).get('/transactions').query({ value: 150000 })

    // assert
    const list = response.body.transactions

    const [transaction] = list.transactions

    expect(response.statusCode).toBe(200)
    expect(list.transactions.length).toBeGreaterThanOrEqual(1)
    expect(transaction.average).toBeDefined()
    expect(transaction.variationValue).toBeDefined()
  })
})
