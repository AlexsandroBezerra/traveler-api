import { getRepository } from 'typeorm'
import AppError from '../errors/AppError'

import City from '../infra/database/entities/City'
import ISearchProvider from '../providers/SearchProvider/models/ISearchProvider'

interface IRequest {
  name: string
  image: string
  description: string
  famousFor: string
}

class CreateCityService {
  constructor(private searchProvider: ISearchProvider) {}

  public async execute({
    name,
    description,
    famousFor,
    image
  }: IRequest): Promise<City> {
    const citiesRepository = getRepository(City)

    const alreadyExists = await citiesRepository.findOne({
      where: { name }
    })

    if (alreadyExists) {
      throw new AppError(
        'CONFLICT',
        'The city provided is already created',
        409
      )
    }

    const city = citiesRepository.create({
      name,
      description,
      famousFor,
      image
    })

    await citiesRepository.save(city)

    await this.searchProvider.save({
      collection: 'cities',
      result: `cities:${city.id}`,
      searchable: `${city.name} ${city.description} ${city.famousFor}`
    })

    return city
  }
}

export default CreateCityService
