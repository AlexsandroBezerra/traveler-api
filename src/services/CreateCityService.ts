import { getRepository } from 'typeorm'

import City from '../infra/entities/City'

interface IRequest {
  name: string
  image: string
  description: string
  famousFor: string
}

class CreateCityService {
  public async execute({
    name,
    description,
    famousFor,
    image
  }: IRequest): Promise<City> {
    const citiesRepository = getRepository(City)

    const alreadyExists = await citiesRepository.findOne({
      where: { name }
    })

    if (alreadyExists) {
      throw new Error('City is already booked')
    }

    const city = citiesRepository.create({
      name,
      description,
      famousFor,
      image
    })

    await citiesRepository.save(city)

    return city
  }
}

export default CreateCityService
