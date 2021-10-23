const { connect } = require('../../../lib/database')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')
const { reset } = require('../../../lib/test')
const { ErrorTypesEnum } = require('../../enums/ErrorTypesEnum')
const request = require('supertest')
const app = require('../../app').app

describe('integration:createTransaction', () => {
  beforeAll(async () => {
    await connect()
  })

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500))
    await reset()
  })

  it('should return 200 on Create Transaction', async () => {
    // arrange
    const transaction = {
      value: 500,
      amount: 0.25,
      transactionAt: moment().subtract(1, 'days').toDate()
    }
    // act
    const response = await request(app).post('/transactions').send(transaction)

    // assert
    const transactionCreated = response.body.transaction

    expect(response.statusCode).toBe(200)
    expect(transactionCreated.value).toBe(transaction.value)
    expect(transactionCreated.amount).toBe(transactionCreated.amount)
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
    expect(error.message).toMatch('O campo quantidade é obrigatório')
  })
})
