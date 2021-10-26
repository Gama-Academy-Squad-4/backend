const { transactionService } = require('../../services/transactionService')

/**
*  @openapi
*   /transactions/:transactionId:
*    get:
*      summary: Get transaction
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
*        description: 'Return transaction'
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
*               type: string
*               format: date-time
*             updatedAt:
*               type: string
*               format: date-time
*             createdAt:
*               type: string
*               format: date-time
*       412:
*        description: 'Transaction not found'
*        schema:
*          $ref: '#/definitions/TransactionNotFound'
*/

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
