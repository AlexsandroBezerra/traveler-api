import { inject, injectable } from 'tsyringe'

import City from '@infra/database/entities/City'

import AppError from '@errors/AppError'
import ISearchProvider from '@providers/SearchProvider/models/ISearchProvider'
import ICitiesRepository from '@repositories/ICitiesRepository'
import IStorageProvider from '@providers/StorageProvider/models/IStorageProvider'
import ILazyLoadProvider from '@providers/LazyLoadProvider/models/ILazyLoadProvider'

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
    private searchProvider: ISearchProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('LazyLoadProvider')
    private lazyLoadProvider: ILazyLoadProvider
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
        'Conflict',
        'The city provided is already created',
        409
      )
    }

    const imageHash = await this.lazyLoadProvider.encode(image)

    const filename = await this.storageProvider.saveFile(image)

    const city = await this.citiesRepository.create({
      name,
      description,
      famousFor,
      image: filename,
      imageHash
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
