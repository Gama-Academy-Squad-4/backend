const { transactionService } = require('../../services/transactionService')

/**
*  @openapi
*   /transactions:
*    post:
*      summary: Create a new transaction
*      consumes:
*      - application/json
*      parameters:
*      - in: body
*        name: transaction
*        description: Transaction to create.
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
*        description: 'Transaction created'
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
*       422:
*        description: 'Invalid InvalidSchema'
*        schema:
*          $ref: '#/definitions/InvalidSchema'
*/
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
