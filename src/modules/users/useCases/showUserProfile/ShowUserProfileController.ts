import { Request, Response } from "express";

import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

class ShowUserProfileController {
  constructor(private showUserProfileUseCase: ShowUserProfileUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id } = request.params;
      const user = await this.showUserProfileUseCase.execute({ user_id });

      return response.status(200).json(user);
    } catch (error) {
      return response.status(404).send({ error: error.message });
    }
  }
}

export { ShowUserProfileController };
