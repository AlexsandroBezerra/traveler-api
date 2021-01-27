import { Router } from 'express'

import CreateCityService from '../../../services/CreateCityService'

const citiesRouter = Router()

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
