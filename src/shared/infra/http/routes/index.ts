import { Router } from "express";

import { authenticateRouter } from "./authenticate.routes";
import { carsRoutes } from "./cars.route";
import { categoriesRoutes } from "./categories.routes";
import { passwordRouter } from "./password.routes";
import { rentalsRouter } from "./rentals.route";
import { specificationsRoutes } from "./specifications.routes";
import { userRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRouter);
router.use("/users", userRoutes);
router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalsRouter);
router.use("/password", passwordRouter);

export { router };
