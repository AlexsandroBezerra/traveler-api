import { inject, injectable } from 'tsyringe'

import AppError from '@errors/AppError'

import IStorageProvider from '@providers/StorageProvider/models/IStorageProvider'
import ICitiesRepository from '@repositories/ICitiesRepository'
import City from '@infra/database/entities/City'
import ILazyLoadProvider from '@providers/LazyLoadProvider/models/ILazyLoadProvider'

interface IRequest {
  cityId: string
  imageFilename: string
}

@injectable()
class UpdateCityImageService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('LazyLoadProvider')
    private lazyLoadProvider: ILazyLoadProvider
  ) {}

  public async execute({ cityId, imageFilename }: IRequest): Promise<City> {
    const city = await this.citiesRepository.findById(cityId)

    if (!city) {
      throw new AppError('Not Found', 'City provided was not found', 404)
    }

    await this.storageProvider.deleteFile(city.image)

    const imageHash = await this.lazyLoadProvider.encode(imageFilename)
    const fileName = await this.storageProvider.saveFile(imageFilename)

    city.image = fileName
    city.imageHash = imageHash

    await this.citiesRepository.update(city)

    return city
  }
}

export default UpdateCityImageService
