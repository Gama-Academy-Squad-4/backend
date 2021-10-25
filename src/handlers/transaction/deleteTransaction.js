const { transactionService } = require('../../services/transactionService')

/**
*  @openapi
*   /transactions/:transactionId:
*    delete:
*      summary: Delete transaction
*      consumes:
*      - application/json
*      parameters:
*      - in: path
*        name: transactionId
*        description: Transaction id
*        required: true
*        type: string
*      responses:
*       200:
*        description: 'Transaction removed'
*        schema:
*          type: object
*          properties:
*             _id:
*               type: string
*             value:
*               type: number
*             amount:
*               type: number
*             transactionAt:
*               type: date
*             updatedAt:
*               type: date
*             createdAt:
*               type: date
*       412:
*        description: 'Transaction not found'
*        schema:
*          $ref: '#/definitions/TransactionNotFound'
*/

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
