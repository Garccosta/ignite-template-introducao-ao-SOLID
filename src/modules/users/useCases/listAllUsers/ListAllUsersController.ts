import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.headers;

      const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);

      const allUsers = await listAllUsersUseCase.execute({
        user_id: String(user_id),
      });
      return response.status(200).json(allUsers);
    } catch (error) {
      return response.status(400).send({ error: error.message });
    }
  }
}

export { ListAllUsersController };
