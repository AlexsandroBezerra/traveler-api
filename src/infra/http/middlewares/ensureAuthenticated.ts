import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import authConfig from '@configs/auth'
import AppError from '@errors/AppError'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Unauthorized', 'JWT token is missing', 401)
  }

  const [scheme, token] = authHeader.split(' ')

  if (!/Bearer$/i.test(scheme)) {
    throw new AppError('Unauthorized', 'Mal-formatted token', 401)
  }

  try {
    const decoded = verify(token, authConfig.jwt.secret)

    const { sub } = decoded as ITokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch {
    throw new AppError('Unauthorized', 'Invalid JWT token', 401)
  }
}
