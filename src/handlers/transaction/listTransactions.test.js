const { connect } = require('../../../lib/database')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')
const { reset } = require('../../../lib/test')
const request = require('supertest')
const app = require('../../app').app
const { transactionService } = require('../../services/transactionService')

const createTransactions = async () => {
  await transactionService.create({
    value: 700,
    amount: 0.20,
    transactionAt: moment().subtract(1, 'days').toDate()
  })

  await transactionService.create({
    value: 800,
    amount: 0.25,
    transactionAt: moment().toDate()
  })

  await transactionService.create({
    value: 900,
    amount: 0.30,
    transactionAt: moment().toDate()
  })

  await transactionService.create({
    value: 1000,
    amount: 0.40,
    transactionAt: moment().toDate()
  })
}

describe('integration:listTransactions', () => {
  beforeAll(async () => {
    await connect()
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

    expect(response.statusCode).toBe(200)
    expect(list.transactions.length).toBeGreaterThanOrEqual(4)
  })

  it('should return 200 and Transaction by value', async () => {
    // arrange

    // act

    const response = await request(app).get('/transactions').query({ value: 800 })

    // assert
    const list = response.body.transactions

    expect(response.statusCode).toBe(200)
    expect(list.transactions.length).toBeGreaterThanOrEqual(1)
  })

  it('should return 200 and Transaction by amount', async () => {
    // arrange

    // act

    const response = await request(app).get('/transactions').query({ amount: 0.30 })

    // assert
    const list = response.body.transactions

    expect(response.statusCode).toBe(200)
    expect(list.transactions.length).toBeGreaterThanOrEqual(1)
  })
})
