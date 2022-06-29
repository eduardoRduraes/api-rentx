import { Router } from "express";

import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

import { AuthenticateUserController } from "../../../../modules/accounts/useCases/authentication/AuthenticateUserController";

const authenticateRouter = Router();

const authenticateUserController = new AuthenticateUserController();

const refreshTokenController = new RefreshTokenController();

authenticateRouter.post("/sessions", authenticateUserController.handle);
authenticateRouter.post("/refresh-token", refreshTokenController.handle);

export { authenticateRouter };
