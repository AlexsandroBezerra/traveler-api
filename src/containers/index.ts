import { container } from 'tsyringe'

import './providers'

import ICitiesRepository from '@repositories/ICitiesRepository'
import CitiesRepository from '@infra/database/repositories/CitiesRepository'

import IUsersRepository from '@repositories/IUsersRepository'
import UsersRepository from '@infra/database/repositories/UsersRepository'

container.registerSingleton<ICitiesRepository>(
  'CitiesRepository',
  CitiesRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)
