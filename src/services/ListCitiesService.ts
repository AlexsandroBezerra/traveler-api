import { inject, injectable } from 'tsyringe'

import City from '../infra/database/entities/City'
import ICitiesRepository from '../repositories/ICitiesRepository'

@injectable()
class ListCitiesService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository
  ) {}

  public async execute(): Promise<City[]> {
    const cities = await this.citiesRepository.all()

    return cities
  }
}

export default ListCitiesService
