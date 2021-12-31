import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.params;

      const showUserProfileUseCase = container.resolve(ShowUserProfileUseCase);

      const user = await showUserProfileUseCase.execute({ user_id });

      return response.status(200).json(user);
    } catch (error) {
      return response.status(404).send({ error: error.message });
    }
  }
}

export { ShowUserProfileController };
