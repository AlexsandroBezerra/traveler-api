import { Router } from "express";

import { citiesRouter } from "./cities.routes";
import { sessionsRouter } from "./sessions.routes";
import { usersRouter } from "./users.routes";

export const routes = Router();

routes.use("/cities", citiesRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
