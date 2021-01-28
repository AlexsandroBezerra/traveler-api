import { container } from 'tsyringe'

import './providers'

import ICitiesRepository from '../repositories/ICitiesRepository'
import CitiesRepository from '../infra/database/repositories/CitiesRepository'

container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository
)
