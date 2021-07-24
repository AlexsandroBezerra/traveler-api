import { Router } from "express";

import { citiesRouter } from "./cities.routes";

export const routes = Router();

routes.use("/cities", citiesRouter);
