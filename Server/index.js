const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./app.router')

const { PORT } = require('./config')

app.use(express.json())
app.use(cors())

app.use(router)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
