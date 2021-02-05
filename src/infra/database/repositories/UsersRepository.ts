import { getRepository, Repository } from 'typeorm'

import User from '../entities/User'

import ICreateUserDTO from '@dtos/ICreateUserDTO'
import IUsersRepository from '@repositories/IUsersRepository'

class CitiesRepository implements IUsersRepository {
  ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email }
    })

    return user
  }
}

export default CitiesRepository
