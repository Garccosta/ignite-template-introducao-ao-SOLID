import { UsersRepository } from "../../repositories/implementations/UsersRepository";
import { TurnUserAdminController } from "./TurnUserAdminController";
import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

export default (): TurnUserAdminController => {
  const usersRepository = new UsersRepository();
  const turnUserAdminUseCase = new TurnUserAdminUseCase(usersRepository);
  return new TurnUserAdminController(turnUserAdminUseCase);
};
