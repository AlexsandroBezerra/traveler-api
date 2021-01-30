import { inject, injectable } from 'tsyringe'

import City from '@infra/database/entities/City'

import AppError from '@errors/AppError'
import ISearchProvider from '@providers/SearchProvider/models/ISearchProvider'
import ICitiesRepository from '@repositories/ICitiesRepository'
import IStorageProvider from '@providers/StorageProvider/models/IStorageProvider'

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
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    name,
    description,
    famousFor,
    image
  }: IRequest): Promise<City> {
    const alreadyExists = await this.citiesRepository.findByName(name)

    const filename = await this.storageProvider.saveFile(image)

    if (alreadyExists) {
      await this.storageProvider.deleteFile(filename)

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
      image: filename
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
