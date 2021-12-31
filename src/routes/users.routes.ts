import { Router } from "express";

import { CreateUserController } from "../modules/users/useCases/createUser/CreateUserController";
import listAllUsersController from "../modules/users/useCases/listAllUsers";
import showUserProfileController from "../modules/users/useCases/showUserProfile";
import turnUserAdminController from "../modules/users/useCases/turnUserAdmin";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/:user_id/admin", (request, response) =>
  turnUserAdminController().handle(request, response)
);

usersRoutes.get("/:user_id", (request, response) =>
  showUserProfileController().handle(request, response)
);

usersRoutes.get("/", (request, response) =>
  listAllUsersController().handle(request, response)
);

export { usersRoutes };
