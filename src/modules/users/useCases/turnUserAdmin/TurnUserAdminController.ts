import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.params;
      const user = await this.turnUserAdminUseCase.execute({ user_id });

      return response.status(200).json(user);
    } catch (error) {
      return response.status(404).send({ error: error.message });
    }
  }
}

export { TurnUserAdminController };
