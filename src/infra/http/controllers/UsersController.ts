import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import authConfigs from '@configs/auth'
import CreateUserService from '@services/CreateUserService'
import AppError from '@errors/AppError'

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    // TMP Admin authentication
    const { authorization } = request.headers

    if (authorization !== authConfigs.admin.secret) {
      throw new AppError(
        'Unauthorized',
        "You don't have permission to create an user",
        401
      )
    }

    const { email, password } = request.body

    const createUser = container.resolve(CreateUserService)

    const user = await createUser.execute({
      email,
      password
    })

    return response.json(classToClass(user))
  }
}

export default UsersController
