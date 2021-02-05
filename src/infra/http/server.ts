import '../database/connection'

import 'dotenv/config'
import 'reflect-metadata'
import { errors } from 'celebrate'
import cors from 'cors'
import express from 'express'
import 'express-async-errors'

import uploadConfigs from '@configs/upload'
import errorHandler from '@errors/handler'
import routes from './routes'
import '@containers'

const PORT = process.env.PORT || 3333
const app = express()

app.use(cors())
app.use('/static', express.static(uploadConfigs.uploadsFolder))

app.use(express.json())
app.use(routes)

app.use(errors())

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
