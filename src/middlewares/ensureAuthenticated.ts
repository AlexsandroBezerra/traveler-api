import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { authConfigs } from "../configs/auth";

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
};

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: true,
      code: "token.required",
      message: "JWT token is missing",
    });
  }

  const [scheme, token] = authHeader.split(" ");

  if (!/Bearer$/i.test(scheme)) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Mal-formatted token",
    });
  }

  try {
    const decoded = verify(token, authConfigs.jwt.secret);

    const { sub } = decoded as ITokenPayload;
    const id = Number(sub);

    request.user = { id };

    return next();
  } catch {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Invalid JWT token",
    });
  }
}
