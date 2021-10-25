const { dashboardService } = require('../../services/dashboardService')

/**
*  @openapi
*   /dashboards:
*    get:
*      summary: Get statistics
*      consumes:
*      - application/json
*      responses:
*       200:
*        description: 'Transaction statistics'
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
*             updatedAt:
*               type: date
*             createdAt:
*               type: date
*/

const getStatistics = async (req, res) => {
  try {
    const statistics = await dashboardService.getTransactionStatistics()

    return res.json({
      statistics
    })
  } catch (error) {
    if (error) return res.status(error.statusCode).json(error)
  }
}

module.exports = {
  getStatistics
}
