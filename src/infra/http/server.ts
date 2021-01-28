import '../database/connection'

import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'
import 'express-async-errors'

import errorHandler from '../../errors/handler'
import routes from './routes'
import '../../container'

const PORT = process.env.PORT || 3333
const app = express()

app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
