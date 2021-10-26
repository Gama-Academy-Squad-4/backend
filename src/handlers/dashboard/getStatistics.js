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
*          type: object
*          properties:
*             btcNow:
*               type: object
*               properties:
*                valueNow:
*                  type: number
*                hight:
*                  type: number
*                low:
*                  type: number
*             consolidate:
*               type: object
*               properties:
*                totalInvested:
*                  type: number
*                totalBalance:
*                  type: number
*                totalProfit:
*                  type: number
*             totalWeek:
*               type: object
*               properties:
*                totalBalance:
*                  type: number
*                totalAvarage:
*                  type: number
*             totalMounth:
*               type: object
*               properties:
*                totalBalance:
*                  type: number
*                totalAvarage:
*                  type: number
*             consolidateWeek:
*               type: array
*               items:
*                type: object
*                properties:
*                 transactionAt:
*                   type: string
*                   format: date-time
*                 totalValue:
*                   type: number
*/

const getStatistics = async (req, res) => {
  try {
    const statistics = await dashboardService.getTransactionsStatistics()

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
