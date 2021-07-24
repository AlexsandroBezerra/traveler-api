import bcrypt from "bcryptjs";
import { Router } from "express";
import { getRepository } from "typeorm";
import jwt from "jsonwebtoken";

import { User } from "../models/User";
import { authConfigs } from "../configs/auth";

export const sessionsRouter = Router();

const invalidCredentialsResponse = {
  error: true,
  code: "invalid.credentials",
  message: "Invalid email/password combination",
};

sessionsRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = getRepository(User);

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

  return response.json({ token });
});
