import { getRepository } from 'typeorm'

import City from '../infra/database/entities/City'
import ISearchProvider from '../providers/SearchProvider/models/ISearchProvider'

interface IRequest {
  query: string
}

class SearchCityService {
  constructor(private searchProvider: ISearchProvider) {}

  public async execute({ query }: IRequest): Promise<City[]> {
    const results = await this.searchProvider.query({
      collection: 'cities',
      terms: query
    })

    if (!results) {
      return []
    }

    const cityIds = results.map(result => result.split(':')[1])

    const citiesRepository = getRepository(City)

    const cities = await citiesRepository.findByIds(cityIds)

    return cities
  }
}

export default SearchCityService
