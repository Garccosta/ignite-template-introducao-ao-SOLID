import { Router } from "express";

import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import { ListAllUsersController } from "../modules/users/useCases/listAllUsers/ListAllUsersController";
import { ShowUserProfileController } from "../modules/users/useCases/showUserProfile/ShowUserProfileController";
import turnUserAdminController from "../modules/users/useCases/turnUserAdmin";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listAllUserController = new ListAllUsersController();
const showUserProfileController = new ShowUserProfileController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/:user_id/admin", (request, response) =>
  turnUserAdminController().handle(request, response)
);

usersRoutes.get("/:user_id", showUserProfileController.handle);

usersRoutes.get("/", listAllUserController.handle);

export { usersRoutes };
