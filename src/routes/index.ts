import { Router } from "express";

import { citiesRouter } from "./cities.routes";
import { usersRouter } from "./users.routes";

export const routes = Router();

routes.use("/cities", citiesRouter);
routes.use("/users", usersRouter);
