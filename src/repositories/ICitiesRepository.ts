import City from '@infra/database/entities/City'

import ICreateCityDTO from '@dtos/ICreateCityDTO'
import IUpdateCityDTO from '@dtos/IUpdateCityDTO'

interface ICitiesRepository {
  all(): Promise<City[]>
  findByName(name: string): Promise<City | undefined>
  findById(id: string): Promise<City | undefined>
  findByIds(ids: string[]): Promise<City[]>
  create(cityData: ICreateCityDTO): Promise<City>
  update(city: IUpdateCityDTO): Promise<City>
}

export default ICitiesRepository
