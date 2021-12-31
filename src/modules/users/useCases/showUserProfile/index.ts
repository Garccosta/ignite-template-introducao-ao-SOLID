import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { ShowUserProfileController } from "./ShowUserProfileController";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

export default (): ShowUserProfileController => {
  const usersRepository = new UsersRepository();
  const showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository);
  return new ShowUserProfileController(showUserProfileUseCase);
};
