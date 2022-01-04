import { injectable, inject } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}
@injectable()
class TurnUserAdminUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("There is no user with this id!");
    }

    this.usersRepository.turnAdmin(user);

    return user;
  }
}

export { TurnUserAdminUseCase };
