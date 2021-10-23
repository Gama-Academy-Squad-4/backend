const { connect } = require('../../../lib/database')
const { reset } = require('../../../lib/test')
const { ErrorTypesEnum } = require('../../../src/enums/ErrorTypesEnum')
const request = require('supertest')
const app = require('../../app').app

describe('integration:createUser', () => {
  beforeAll(async () => {
    await connect()
  })

  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500))
    await reset()
  })

  it('should return 200 on Create User', async () => {
    // arrange

    // act
    const response = await request(app).post('/users').send({
      email: 'rafael@rafael.com'
    })

    // assert
    const error = response.body

    expect(response.statusCode).toBe(422)
    expect(error.type).toBe(ErrorTypesEnum.INVALID_SCHEMA)
    // expect(createdBadge.title).toBe(badge.title)
  })
})
