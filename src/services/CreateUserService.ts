import { inject, injectable } from 'tsyringe'

import User from '@infra/database/entities/User'

import AppError from '@errors/AppError'
import IUsersRepository from '@repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<User> {
    const alreadyExists = await this.usersRepository.findByEmail(email)

    if (alreadyExists) {
      throw new AppError(
        'Conflict',
        'The email address provided is already used',
        409
      )
    }

    const user = await this.usersRepository.create({ email, password })

    return user
  }
}

export default CreateUserService
