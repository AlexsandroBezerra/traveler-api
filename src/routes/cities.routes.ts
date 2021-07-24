import { Router } from "express";
import { getRepository } from "typeorm";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { City } from "../models/City";

export const citiesRouter = Router();

citiesRouter.get("/", async (request, response) => {
  const citiesRepository = getRepository(City);

  const cities = await citiesRepository.find();

  return response.json(cities);
});

citiesRouter.use(ensureAuthenticated);

citiesRouter.post("/", async (request, response) => {
  const { name, description, photo } = request.body;

  const citiesRepository = getRepository(City);

  const city = citiesRepository.create({
    name,
    description,
    photo,
    slug: name.replace(/ /g, "-").toLowerCase(),
  });

  await citiesRepository.save(city);

  return response.status(201).json(city);
});
