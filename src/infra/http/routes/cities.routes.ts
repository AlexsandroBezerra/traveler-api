import { Router } from 'express'

import CreateCityService from '../../../services/CreateCityService'
import ListCitiesService from '../../../services/ListCitiesService'
import ShowCityService from '../../../services/ShowCityService'

const citiesRouter = Router()

citiesRouter.get('/', async (request, response) => {
  const listCities = new ListCitiesService()

  const cities = await listCities.execute()

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

  const createCity = new CreateCityService()

  const city = await createCity.execute({
    name,
    description,
    famousFor,
    image
  })

  return response.json(city)
})

export default citiesRouter
