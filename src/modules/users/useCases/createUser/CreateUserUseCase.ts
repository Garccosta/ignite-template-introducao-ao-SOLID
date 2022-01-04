// bcryptjs is used instead of bcrypt due to lack of ARM64 compatibility on the latter
import { hash } from "bcryptjs";
import { ICreateUserDTO } from "modules/users/dtos/ICreateUserDTO";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    const { password, email } = data;
    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    const user = await this.usersRepository.create({
      ...data,
      password: passwordHash,
    });

    return user;
  }
}

export { CreateUserUseCase };
