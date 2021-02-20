import { inject, injectable } from 'tsyringe'

import AppError from '@errors/AppError'
import City from '@infra/database/entities/City'
import ICitiesRepository from '@repositories/ICitiesRepository'

interface IRequest {
  slug: string
}

@injectable()
class ShowCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) {}

  public async execute({ slug }: IRequest): Promise<City> {
    const city = await this.citiesRepository.findBySlug(slug)

    if (!city) {
      throw new AppError('Not Found', 'City not found', 404)
    }

    return city
  }
}

export default ShowCityService
