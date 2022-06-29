import { Router } from "express";
import multer from "multer";

import { ProfileUserController } from "@modules/accounts/useCases/profileUser/ProfileUserController";

import uploadConfig from "../../../../config/upload";
import { UpdateUserAvatarController } from "../../../../modules/accounts/updateUserAvatar/UpdateUserAvatarController";
import { CreateUserController } from "../../../../modules/accounts/useCases/createUser/CreateUserController";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

const uploadAvatar = multer(uploadConfig);

userRoutes.post("/", createUserController.handle);

userRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

userRoutes.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export { userRoutes };
