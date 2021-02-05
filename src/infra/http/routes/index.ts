import { Router } from 'express'

import citiesRouter from './cities.routes'
import sessionsRouter from './sessions.routes'
import usersRouter from './users.routes'

const routes = Router()

routes.use('/cities', citiesRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/users', usersRouter)

export default routes
