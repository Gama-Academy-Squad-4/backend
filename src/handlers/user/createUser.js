const { userService } = require('../../services/userService')

const createUser = async (req, res) => {
  try {
    const user = await userService.create(req.body)

    return res.json({
      message: 'success',
      data: user
    })
  } catch (error) {
    if (error) return res.status(error.statusCode).json(error)
  }
}

module.exports = {
  createUser
}
