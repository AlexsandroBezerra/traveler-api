import bcrypt from "bcryptjs";
import { Router } from "express";
import { getRepository } from "typeorm";

import { User } from "../models/User";

export const usersRouter = Router();

usersRouter.post("/", async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = getRepository(User);

  const hashedPassword = await bcrypt.hash(password, 8);

  const user = usersRepository.create({
    email,
    password: hashedPassword,
  });

  await usersRepository.save(user);

  return response.status(201).send();
});
