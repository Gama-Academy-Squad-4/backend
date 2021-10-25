const { connect } = require('../../../lib/database')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')
const { reset } = require('../../../lib/test')
const { ErrorTypesEnum } = require('../../enums/ErrorTypesEnum')
const request = require('supertest')
const app = require('../../app').app
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
}

describe('integration:createTransaction', () => {
  let mock = null

  beforeAll(async () => {
    mock = new MockAdapter(axios)

    await connect()

    await createAxiosMock(mock)
  })

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500))
    await reset()
  })

  it('should return 200 on Create Transaction', async () => {
    // arrange
    const transaction = {
      value: 20000,
      transactionAt: moment('2021-10-15')
    }
    // act
    const response = await request(app).post('/transactions').send(transaction)

    // assert
    const transactionCreated = response.body.transaction

    expect(response.statusCode).toBe(200)
    expect(transactionCreated.value).toBe(transaction.value)
    expect(transactionCreated.transactionAt).toBeDefined()
    expect(transactionCreated.amount).toBeDefined()
  })

  it('should return 422 and INVALID_SCHEMA error using invalid input', async () => {
    // arrange
    const transaction = {
      value: 500
    }
    // act
    const response = await request(app).post('/transactions').send(transaction)

    // assert
    const error = response.body

    expect(response.statusCode).toBe(422)
    expect(error.type).toBe(ErrorTypesEnum.INVALID_SCHEMA)
    expect(error.message).toMatch('O campo data da transação é obrigatório')
  })
})
