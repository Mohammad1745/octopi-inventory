const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

require('dotenv').config()
require('./config/database')
require('./app/providers/route_service_provider')(app, express)


const PORT = process.env.PORT || 8001
app.listen(PORT, () => console.log(`Server Running on ${PORT}`))