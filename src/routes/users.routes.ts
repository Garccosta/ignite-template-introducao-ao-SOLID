import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { ListAllUsersController } from "../modules/users/useCases/listAllUsers/ListAllUsersController";
import { ShowUserProfileController } from "../modules/users/useCases/showUserProfile/ShowUserProfileController";
import { TurnUserAdminController } from "../modules/users/useCases/turnUserAdmin/TurnUserAdminController";
import { UpdateUserAvatarController } from "../modules/users/useCases/updateUserAvatar/UpdateUserAvatarController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const createUserController = new CreateUserController();
const listAllUserController = new ListAllUsersController();
const showUserProfileController = new ShowUserProfileController();
const turnUserAdminController = new TurnUserAdminController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.use(ensureAuthenticated);

usersRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

usersRoutes.patch("/:user_id/admin", turnUserAdminController.handle);

usersRoutes.get("/:user_id", showUserProfileController.handle);

usersRoutes.get("/", listAllUserController.handle);

export { usersRoutes };
