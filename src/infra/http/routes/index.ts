import { Router } from 'express'

import citiesRouter from './cities.routes'

const routes = Router()

routes.use('/cities', citiesRouter)

export default routes
