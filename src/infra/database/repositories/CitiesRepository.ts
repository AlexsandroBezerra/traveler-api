import { getRepository, Repository } from 'typeorm'

import City from '../entities/City'

import ICreateCityDTO from '@dtos/ICreateCityDTO'
import ICitiesRepository from '@repositories/ICitiesRepository'
import IUpdateCityDTO from '@dtos/IUpdateCityDTO'

class CitiesRepository implements ICitiesRepository {
  ormRepository: Repository<City>

  constructor() {
    this.ormRepository = getRepository(City)
  }

  public async all(): Promise<City[]> {
    const cities = await this.ormRepository.find()

    return cities
  }

  public async findByIds(ids: string[]): Promise<City[]> {
    const cities = await this.ormRepository.findByIds(ids)

    return cities
  }

  public async findById(id: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne(id)

    return city
  }

  public async findByName(name: string): Promise<City | undefined> {
    const city = await this.ormRepository.findOne({
      where: { name }
    })

    return city
  }

  public async create(cityData: ICreateCityDTO): Promise<City> {
    const city = this.ormRepository.create(cityData)

    await this.ormRepository.save(city)

    return city
  }

  public async update(city: IUpdateCityDTO): Promise<City> {
    const updatedCity = await this.ormRepository.save(city)

    return updatedCity
  }
}

export default CitiesRepository
