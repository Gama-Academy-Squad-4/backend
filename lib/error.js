const { ErrorTypesEnum } = require('../src/enums/ErrorTypesEnum')

/**
 * @openapi
 * definitions:
 *  InvalidSchema:
 *    description: Invalid input
 *    type: object
 *    properties:
 *      type:
 *        type: string
 *        description: INVALID_SCHEMA
 *      message:
 *        type: string
 *        description: 'O campo de valor é obrigatório, O campo quantidade é obrigatório'
 *      statusCode:
 *        type: number
 *        description: 422
 */
const buildSchemaValidationError = originalError => {
  if (originalError.errors) {
    const keyErrors = Object.keys(originalError.errors)
    const errorMessages = keyErrors.map(keyError => originalError.errors[keyError])
    const finalMessage = errorMessages.join(', ')
    originalError.message = finalMessage
  }

  originalError.type = ErrorTypesEnum.INVALID_SCHEMA
  originalError.statusCode = 422

  return originalError
}

/**
 * @openapi
 * definitions:
 *  TransactionNotFound:
 *    type: object
 *    description: Transaction not found
 *    properties:
 *      type:
 *        type: string
 *        description: TRANSACTION_NOT_FOUND
 *      message:
 *        type: string
 *        description: 'Transação: 123132555566 não encontrada'
 *      statusCode:
 *        type: number
 *        description: 412
 */
const buildTransactionNotFoundError = (transactionId) => {
  const error = new Error(`Transação: ${transactionId} não encontrada`)
  return {
    ...error,
    message: error.message,
    stack: error.stack,
    type: ErrorTypesEnum.TRANSACTION_NOT_FOUND,
    statusCode: 412
  }
}

/**
 * @openapi
 * definitions:
 *  TimeoutConnectBitcoinApi:
 *    type: object
 *    description: Timeout Error to connect bitcoin api
 *    properties:
 *      type:
 *        type: string
 *        description: TIMEOUT_CONNECT_BITCOIN_API
 *      message:
 *        type: string
 *        description: 'Serviço indisponível, por favor tente novamente mais tarde.'
 *      statusCode:
 *        type: number
 *        description: 422
 */
const buildTimeoutConnectBitcoinApiError = () => {
  const error = new Error('Serviço indisponível, por favor tente novamente mais tarde.')
  return {
    ...error,
    message: error.message,
    stack: error.stack,
    type: ErrorTypesEnum.TIMEOUT_CONNECT_BITCOIN_API,
    statusCode: 422
  }
}

/**
 * @openapi
 * definitions:
 *  ConnectBitcoinApi:
 *    type: object
 *    description: Error connect bitcoin api
 *    properties:
 *      type:
 *        type: string
 *        description: NETWORK_ERROR_API
 *      message:
 *        type: string
 *        description: 'Não foi possível obter dados do mercado de bitcoins no momento'
 *      statusCode:
 *        type: number
 *        description: 422
 */
const buildConnectBitcoinApiError = () => {
  const error = new Error('Não foi possível obter dados do mercado de bitcoins no momento')
  return {
    ...error,
    message: error.message,
    stack: error.stack,
    type: ErrorTypesEnum.NETWORK_ERROR_API,
    statusCode: 422
  }
}

const error = {
  buildSchemaValidationError,
  buildTransactionNotFoundError,
  buildTimeoutConnectBitcoinApiError,
  buildConnectBitcoinApiError
}

module.exports = {
  error
}
