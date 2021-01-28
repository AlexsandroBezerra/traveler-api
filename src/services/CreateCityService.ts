import { inject, injectable } from 'tsyringe'

import AppError from '../errors/AppError'
import City from '../infra/database/entities/City'
import ISearchProvider from '../container/providers/SearchProvider/models/ISearchProvider'
import ICitiesRepository from '../repositories/ICitiesRepository'

interface IRequest {
  name: string
  image: string
  description: string
  famousFor: string
}

@injectable()
class CreateCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('SearchProvider')
    private searchProvider: ISearchProvider
  ) {}

  public async execute({
    name,
    description,
    famousFor,
    image
  }: IRequest): Promise<City> {
    const alreadyExists = await this.citiesRepository.findByName(name)

    if (alreadyExists) {
      throw new AppError(
        'CONFLICT',
        'The city provided is already created',
        409
      )
    }

    const city = await this.citiesRepository.create({
      name,
      description,
      famousFor,
      image
    })

    await this.searchProvider.save({
      collection: 'cities',
      result: `cities:${city.id}`,
      searchable: `${city.name} ${city.description} ${city.famousFor}`
    })

    return city
  }
}

export default CreateCityService
