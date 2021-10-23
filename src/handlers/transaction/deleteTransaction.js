const { transactionService } = require('../../services/transactionService')

const deleteTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params

    const transaction = await transactionService.remove(transactionId)

    return res.json({
      transaction
    })
  } catch (error) {
    if (error) return res.status(error.statusCode).json(error)
  }
}

module.exports = {
  deleteTransaction
}
