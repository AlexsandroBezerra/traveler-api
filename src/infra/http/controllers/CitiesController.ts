import { Request, Response } from 'express'
import { container } from 'tsyringe'

import ListCitiesService from '@services/ListCitiesService'
import ShowCityService from '@services/ShowCityService'
import CreateCityService from '@services/CreateCityService'
import SearchCityService from '@services/SearchCityService'
import AppError from '@errors/AppError'

class CitiesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCities = container.resolve(ListCitiesService)

    const cities = await listCities.execute()

    return response.json(cities)
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showCity = container.resolve(ShowCityService)

    const cities = await showCity.execute(id)

    return response.json(cities)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, famousFor } = request.body

    // TMP - Image upload validation
    if (!request.file) {
      throw new AppError(
        'Bad Request',
        "'image' field is required, and it must be a image"
      )
    }

    const { filename } = request.file

    const createCity = container.resolve(CreateCityService)

    const city = await createCity.execute({
      name,
      description,
      famousFor,
      image: filename
    })

    return response.json(city)
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { q: query } = request.query as { [key: string]: string }

    const searchCity = container.resolve(SearchCityService)

    const cities = await searchCity.execute({ query })

    return response.json(cities)
  }
}

export default CitiesController
