import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const data = request.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);

      const { name, email, id } = await createUserUseCase.execute(data);

      return response.status(201).send({ name, email, id });
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController };
