import { getRepository } from 'typeorm'
import { validate as isUuid } from 'uuid'

import City from '../infra/database/entities/City'
import AppError from '../errors/AppError'

class ShowCityService {
  public async execute(id: string): Promise<City> {
    const citiesRepository = getRepository(City)

    if (!isUuid(id)) {
      throw new AppError('BAD_REQUEST', 'The id provided is invalid')
    }

    const city = await citiesRepository.findOne(id)

    if (!city) {
      throw new AppError('NOT_FOUND', 'City not found', 404)
    }

    return city
  }
}

export default ShowCityService
