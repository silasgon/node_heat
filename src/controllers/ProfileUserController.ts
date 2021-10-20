import { Request, Response } from "express";
import { ProfileUSerService } from "../services/ProfileUSerService";

class ProfileUserController{
    async handle(request: Request, response: Response){
        const { user_id } = request;

        const service = new ProfileUSerService();

        const result = await service.execute(user_id);

        return response.json(result);
    }
}

export {ProfileUserController};