import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateUserService from '@services/AuthenticateUserService'

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    const result = await authenticateUser.execute({
      email,
      password
    })

    return response.json(classToClass(result))
  }
}

export default SessionsController
