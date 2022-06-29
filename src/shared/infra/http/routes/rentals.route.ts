import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalsController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const rentalsRouter = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRouter.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRouter.post(
    "/devolution/:car_id",
    ensureAuthenticated,
    devolutionRentalController.handle
);

rentalsRouter.get(
    "/user",
    ensureAuthenticated,
    listRentalsByUserController.handle
);

export { rentalsRouter };
