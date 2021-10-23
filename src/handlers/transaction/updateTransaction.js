const { transactionService } = require('../../services/transactionService')

const updateTransaction = async (req, res) => {
  try {
    const transaction = await transactionService.update(req.body)

    return res.json({
      transaction
    })
  } catch (error) {
    if (error) return res.status(error.statusCode).json(error)
  }
}

module.exports = {
  updateTransaction
}
