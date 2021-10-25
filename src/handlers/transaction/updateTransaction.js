const { transactionService } = require('../../services/transactionService')

/**
*  @openapi
*   /transactions:
*    put:
*      summary: Update transaction
*      consumes:
*      - application/json
*      parameters:
*      - in: body
*        name: transaction
*        description: Transaction to update.
*        schema:
*          type: object
*          required:
*            - value
*            - transactionAt
*          properties:
*             value:
*               type: number
*             transactionAt:
*               type: date
*      responses:
*       200:
*        description: 'Transaction updated'
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
*       422:
*        description: 'Invalid InvalidSchema'
*        schema:
*          $ref: '#/definitions/InvalidSchema'
*/

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
