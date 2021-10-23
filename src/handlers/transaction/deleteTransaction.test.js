const { connect } = require('../../../lib/database')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Sao_Paulo')
const { reset } = require('../../../lib/test')
const { ErrorTypesEnum } = require('../../enums/ErrorTypesEnum')
const request = require('supertest')
const app = require('../../app').app
const { transactionService } = require('../../services/transactionService')

describe('integration:updateTransaction', () => {
  beforeAll(async () => {
    await connect()
  })

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500))
    await reset()
  })

  it('should return 200 deleting transaction', async () => {
    // arrange
    const transaction = {
      value: 500,
      amount: 0.25,
      transactionAt: moment().subtract(1, 'days').toDate()

    }

    const { _id: createdTransactionId } = await transactionService.create(transaction)

    // act

    const deleteResponse = await request(app).delete(`/transactions/${createdTransactionId}`)

    // assert
    try {
      await transactionService.findById(createdTransactionId)
    } catch (error) {
      expect(error.type).toBe(ErrorTypesEnum.TRANSACTION_NOT_FOUND)
    }

    expect(deleteResponse.statusCode).toBe(200)
  })

  it('should return 412 and TRANSACTION_NOT_FOUND if try to update invalid transaction', async () => {
    // arrange

    const randomTransactionId = '5ee909e6dd4fb01d6cc17abf'

    // act
    const response = await request(app).delete(`/transactions/${randomTransactionId}`)

    // assert
    const error = response.body

    expect(response.statusCode).toBe(412)
    expect(error.type).toBe(ErrorTypesEnum.TRANSACTION_NOT_FOUND)
    expect(error.message).toMatch('não encontrada')
  })
})
