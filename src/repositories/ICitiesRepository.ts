import City from '../infra/database/entities/City'

import ICreateCityDTO from '../dtos/ICreateCityDTO'

interface ICitiesRepository {
  all(): Promise<City[]>
  create(cityData: ICreateCityDTO): Promise<City>
  findByName(name: string): Promise<City | undefined>
  findById(id: string): Promise<City | undefined>
  findByIds(ids: string[]): Promise<City[]>
}

export default ICitiesRepository
