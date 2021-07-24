import { Router } from "express";
import { citiesController } from "../controllers/CitiesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

export const citiesRouter = Router();

citiesRouter.get("/", citiesController.index);
citiesRouter.get("/:id", citiesController.show);

citiesRouter.use(ensureAuthenticated);

citiesRouter.post("/", citiesController.create);
citiesRouter.put("/:id", citiesController.update);
citiesRouter.delete("/:id", citiesController.delete);
