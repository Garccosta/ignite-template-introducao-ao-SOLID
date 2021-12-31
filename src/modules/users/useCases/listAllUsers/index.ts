import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { ListAllUsersController } from "./ListAllUsersController";
import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

export default (): ListAllUsersController => {
  const usersRepository = new UsersRepository();
  const listAllUsersUseCase = new ListAllUsersUseCase(usersRepository);
  return new ListAllUsersController(listAllUsersUseCase);
};
