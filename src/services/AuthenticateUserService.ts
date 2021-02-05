import jwt from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import authConfigs from '@configs/auth'

import User from '@infra/database/entities/User'

import AppError from '@errors/AppError'
import IUsersRepository from '@repositories/IUsersRepository'
import IHashProvider from '@providers/HashProvider/models/IHashProvider'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError(
        'Unauthorized',
        'Incorrect email/password combination',
        401
      )
    }

    const comparedHash = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!comparedHash) {
      throw new AppError(
        'Unauthorized',
        'Incorrect email/password combination',
        401
      )
    }

    const { secret, expiresIn } = authConfigs.jwt

    const token = jwt.sign({}, secret, { subject: user.id, expiresIn })

    return { user, token }
  }
}

export default AuthenticateUserService
