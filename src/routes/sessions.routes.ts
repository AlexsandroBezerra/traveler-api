import bcrypt from "bcryptjs";
import { Router } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

import { User } from "../models/User";
import { authConfigs } from "../configs/auth";
import { UserToken } from "../models/UserToken";
import { addUserInformationToRequest } from "../middlewares/addUserToRequest";

export const sessionsRouter = Router();

const invalidCredentialsResponse = {
  error: true,
  code: "invalid.credentials",
  message: "Invalid email/password combination",
};

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = getRepository(User);
  const userTokensRepository = getRepository(UserToken);

  const user = await usersRepository.findOne({ email });

  if (!user) {
    return response.status(400).json(invalidCredentialsResponse);
  }

  const hashCompare = await bcrypt.compare(password, user.password);

  if (!hashCompare) {
    return response.status(400).json(invalidCredentialsResponse);
  }

  const token = jwt.sign({}, authConfigs.jwt.secret, {
    subject: user.id.toString(),
    expiresIn: authConfigs.jwt.expiresIn,
  });

  const refreshToken = userTokensRepository.create({
    token: uuid(),
    user_id: user.id
  });

  await userTokensRepository.save(refreshToken);

  return response.json({
    token,
    refreshToken: refreshToken.token,
  });
});

sessionsRouter.post(
  "/refresh",
  addUserInformationToRequest,
  async (request, response) => {
    const { refreshToken } = request.body;
    const { id } = request.user;

    const userTokensRepository = getRepository(UserToken);

    const userToken = await userTokensRepository.findOne({
      token: refreshToken,
      user_id: id,
    });

    if (!userToken) {
      return response.status(401).json({
        error: true,
        code: "invalid.token",
        message: "Invalid refreshToken",
      });
    }

    const newRefreshToken = uuid();

    userToken.token = newRefreshToken;

    await userTokensRepository.save(userToken);

    const token = jwt.sign({}, authConfigs.jwt.secret, {
      subject: id.toString(),
      expiresIn: authConfigs.jwt.expiresIn,
    });

    return response.json({
      token,
      refreshToken: newRefreshToken,
    });
  }
);
