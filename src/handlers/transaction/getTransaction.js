const { transactionService } = require('../../services/transactionService')

const getTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params

    const transaction = await transactionService.findById(transactionId)

    return res.json({
      transaction
    })
  } catch (error) {
    if (error) return res.status(error.statusCode).json(error)
  }
}

module.exports = {
  getTransaction
}
