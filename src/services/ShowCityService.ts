import { inject, injectable } from 'tsyringe'
import { validate as isUuid } from 'uuid'

import AppError from '@errors/AppError'
import City from '@infra/database/entities/City'
import ICitiesRepository from '@repositories/ICitiesRepository'

@injectable()
class ShowCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) {}

  public async execute(id: string): Promise<City> {
    if (!isUuid(id)) {
      throw new AppError('Bad Request', 'The id provided is invalid')
    }

    const city = await this.citiesRepository.findById(id)

    if (!city) {
      throw new AppError('Not Found', 'City not found', 404)
    }

    return city
  }
}

export default ShowCityService
