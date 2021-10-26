const { transactionService } = require('../../services/transactionService')

/**
*  @openapi
*   /transactions:
*    get:
*      summary: List transactions
*      consumes:
*      - application/json
*      responses:
*       200:
*        description: 'Transaction list'
*        schema:
*          type: array
*          items:
*            type: object
*            properties:
*             _id:
*               type: string
*             value:
*               type: number
*             amount:
*               type: number
*             transactionAt:
*               type: string
*               format: date-time
*             average:
*               type: number
*             variationValue:
*               type: number
*             updatedAt:
*               type: string
*               format: date-time
*             createdAt:
*               type: string
*               format: date-time
*/

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
