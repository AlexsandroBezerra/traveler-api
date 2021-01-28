import { inject, injectable } from 'tsyringe'

import City from '../infra/database/entities/City'
import ISearchProvider from '../container/providers/SearchProvider/models/ISearchProvider'
import ICitiesRepository from '../repositories/ICitiesRepository'

interface IRequest {
  query: string
}

@injectable()
class SearchCityService {
  constructor(
    @inject('CitiesRepository')
    private citiesRepository: ICitiesRepository,

    @inject('SearchProvider')
    private searchProvider: ISearchProvider
  ) {}

  public async execute({ query }: IRequest): Promise<City[]> {
    const results = await this.searchProvider.query({
      collection: 'cities',
      terms: query
    })

    if (!results) return []

    const cityIds = results.map(result => {
      const [, id] = result.split(':')

      return id
    })

    const cities = await this.citiesRepository.findByIds(cityIds)

    return cities
  }
}

export default SearchCityService
