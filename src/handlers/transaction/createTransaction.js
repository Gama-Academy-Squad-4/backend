const { transactionService } = require('../../services/transactionService')

const createTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.create(req.body)

    return res.json({
      transaction
    })
  } catch (error) {
    if (error) return res.status(error.statusCode).json(error)
  }
}

module.exports = {
  createTransaction
}
