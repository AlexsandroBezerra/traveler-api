import 'dotenv/config'
import express from 'express'
import 'express-async-errors'

import '../database/connection'
import errorHandler from '../../errors/handler'
import routes from './routes'

const PORT = process.env.PORT || 3333
const app = express()

app.use(express.json())
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
