import { Router } from "express";

import { addUserInformationToRequest } from "../middlewares/addUserToRequest";
import { sessionsController } from "../controllers/sessionsController";

export const sessionsRouter = Router();

sessionsRouter.post("/", sessionsController.create);

sessionsRouter.post(
  "/refresh",
  addUserInformationToRequest,
  sessionsController.update
);
