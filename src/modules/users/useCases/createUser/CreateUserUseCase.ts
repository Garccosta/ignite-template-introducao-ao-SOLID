import { hash } from "bcryptjs";
import { ICreateUserDTO } from "modules/users/dtos/ICreateUserDTO";
import { inject, injectable } from "tsyringe";

import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const { password } = data;
    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      ...data,
      password: passwordHash,
    });
  }
}

export { CreateUserUseCase };
