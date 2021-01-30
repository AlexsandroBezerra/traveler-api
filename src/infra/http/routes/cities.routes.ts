import { Router } from 'express'
import { container } from 'tsyringe'
import multer from 'multer'

import CreateCityService from '@services/CreateCityService'
import ListCitiesService from '@services/ListCitiesService'
import SearchCityService from '@services/SearchCityService'
import ShowCityService from '@services/ShowCityService'
import uploadConfig from '@configs/upload'

const citiesRouter = Router()

const upload = multer(uploadConfig.multer)

citiesRouter.get('/', async (request, response) => {
  const listCities = container.resolve(ListCitiesService)

  const cities = await listCities.execute()

  return response.json(cities)
})

citiesRouter.get('/search', async (request, response) => {
  const { q: query } = request.query as { [key: string]: string }

  const searchCity = container.resolve(SearchCityService)

  const cities = await searchCity.execute({ query })

  return response.json(cities)
})

citiesRouter.get('/:id', async (request, response) => {
  const { id } = request.params

  const showCity = container.resolve(ShowCityService)

  const cities = await showCity.execute(id)

  return response.json(cities)
})

citiesRouter.post('/', upload.single('image'), async (request, response) => {
  const { name, description, famousFor } = request.body
  const { filename } = request.file

  const createCity = container.resolve(CreateCityService)

  const city = await createCity.execute({
    name,
    description,
    famousFor,
    image: filename
  })

  return response.json(city)
})

export default citiesRouter
