import { inject, injectable } from 'tsyringe'

import AppError from '@errors/AppError'
import City from '@infra/database/entities/City'
import ICitiesRepository from '@repositories/ICitiesRepository'

interface IRequest {
  id: string
}

@injectable()
class AddAccessToCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) {}

  public async execute({ id }: IRequest): Promise<City> {
    const city = await this.citiesRepository.findById(id)

    if (!city) {
      throw new AppError('Not Found', 'City not found', 404)
    }

    city.accessesCounter += 1

    this.citiesRepository.update(city)

    return city
  }
}

export default AddAccessToCityService
