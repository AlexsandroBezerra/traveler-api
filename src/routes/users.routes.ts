import { Router } from "express";
import { getRepository } from "typeorm";

import { User } from "../models/User";

export const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = getRepository(User);

  const user = usersRepository.create({ email, password });

  await usersRepository.save(user);

  return response.status(201).send();
});
