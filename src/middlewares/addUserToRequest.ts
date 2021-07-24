import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayLoad {
  iat: number;
  exp: number;
  sub: string;
  role: string;
}

export function addUserInformationToRequest(
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
    const decoded = jwt.decode(token as string) as TokenPayLoad;
    const id = Number(decoded.sub);

    request.user = { id };

    return next();
  } catch (err) {
    return response.status(401).json({
      error: true,
      code: "token.invalid",
      message: "Invalid JWT token",
    });
  }
}
