import { Router } from 'express'
import SonicSearchProvider from '../../../providers/SearchProvider/implementations/SonicSearchProvider'

import CreateCityService from '../../../services/CreateCityService'
import ListCitiesService from '../../../services/ListCitiesService'
import SearchCityService from '../../../services/SearchCityService'
import ShowCityService from '../../../services/ShowCityService'

const citiesRouter = Router()
const searchProvider = new SonicSearchProvider()

citiesRouter.get('/', async (request, response) => {
  const listCities = new ListCitiesService()

  const cities = await listCities.execute()

  return response.json(cities)
})

citiesRouter.get('/search', async (request, response) => {
  const { q: query } = request.query as { [key: string]: string }

  const searchCity = new SearchCityService(searchProvider)

  const cities = await searchCity.execute({ query })

  return response.json(cities)
})

citiesRouter.get('/:id', async (request, response) => {
  const { id } = request.params

  const showCity = new ShowCityService()

  const cities = await showCity.execute(id)

  return response.json(cities)
})

citiesRouter.post('/', async (request, response) => {
  const { name, description, famousFor, image } = request.body

  const createCity = new CreateCityService(searchProvider)

  const city = await createCity.execute({
    name,
    description,
    famousFor,
    image
  })

  return response.json(city)
})

export default citiesRouter
