import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { classToClass } from 'class-transformer'
import CreateUserService from '@services/CreateUserService'

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
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
