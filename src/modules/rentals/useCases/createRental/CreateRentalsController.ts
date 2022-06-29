import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUsecase } from "./CreateRentalslUsecase.";

class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id, expected_return_date } = request.body;
        const { id } = request.user;

        const createRentalUsecase = container.resolve(CreateRentalUsecase);

        const rental = await createRentalUsecase.execute({
            car_id,
            user_id: id,
            expected_return_date,
        });

        return response.status(201).json(rental);
    }
}

export { CreateRentalController };
