import { injectable, inject } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}
@injectable()
class ListAllUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findById(user_id);
    const isAdmin = user.admin === true;

    if (isAdmin) {
      return this.usersRepository.list();
    }

    throw new Error("You don't have permission to execute this command");
  }
}

export { ListAllUsersUseCase };
