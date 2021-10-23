const { transactionService } = require('../../services/transactionService')

const listTransactions = async (req, res) => {
  try {
    const { value, amount, sort, page, perPage } = req.query

    const transactions = await transactionService.list({ value, amount, sort, page, perPage })

    return res.json({
      transactions
    })
  } catch (error) {
    if (error) return res.status(error.statusCode).json(error)
  }
}

module.exports = {
  listTransactions
}
