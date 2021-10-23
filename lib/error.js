const { ErrorTypesEnum } = require('../src/enums/ErrorTypesEnum')

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

const error = {
  buildSchemaValidationError,
  buildTransactionNotFoundError
}

module.exports = {
  error
}
