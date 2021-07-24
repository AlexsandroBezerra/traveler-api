import { Request, Response } from "express";
import { getRepository } from "typeorm";

import { City } from "../models/City";

export const citiesController = {
  async index(request: Request, response: Response) {
    const citiesRepository = getRepository(City);

    const cities = await citiesRepository.find();

    return response.json(cities);
  },

  async create(request: Request, response: Response) {
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
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    const citiesRepository = getRepository(City);

    const cities = await citiesRepository.findOne(id);

    return response.json(cities);
  },

  async update(request: Request, response: Response) {
    const { name, description, photo } = request.body;
    const { id } = request.params;

    const citiesRepository = getRepository(City);

    const city = await citiesRepository.save({
      id: Number(id),
      name,
      description,
      photo,
      slug: name.replace(/ /g, "-").toLowerCase(),
    })

    return response.json(city);
  },

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const citiesRepository = getRepository(City);

    await citiesRepository.delete(id);

    return response.status(204).send();
  }
};
