const { app } = require('./app')
require('dotenv').config()

const DEV_PORT = 3333

app.listen(process.env.PORT || DEV_PORT, () => console.log('🔥️ Server is running'))
