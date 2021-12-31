import { Request, Response } from "express";
import { container } from "tsyringe";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  async handle(request: Request, response: Response): Promise<Response> {
    const turnUserAdminUseCase = container.resolve(TurnUserAdminUseCase);
    try {
      const { user_id } = request.params;
      const user = await turnUserAdminUseCase.execute({ user_id });

      return response.status(200).json(user);
    } catch (error) {
      return response.status(404).send({ error: error.message });
    }
  }
}

export { TurnUserAdminController };
