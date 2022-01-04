import { ICreateUserDTO } from "modules/users/dtos/ICreateUserDTO";
import { getRepository, Repository } from "typeorm";

import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
    });

    await this.repository.save(user);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });
    return user;
  }

  async turnAdmin(receivedUser: User): Promise<void> {
    const user = receivedUser;
    user.admin = true;

    await this.repository.update({ admin: false }, { admin: true });
  }

  async list(): Promise<User[]> {
    const user = await this.repository.find();
    return user;
  }
}

export { UsersRepository };
