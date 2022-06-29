import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationUsecase } from "./CreateCarSpecificationUsecase";

class CreateSpecificationCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { specifications_id } = request.body;

        const createSpecificationUsecase = container.resolve(
            CreateCarSpecificationUsecase
        );

        const cars = await createSpecificationUsecase.execute({
            car_id: id,
            specifications_id,
        });

        return response.status(201).json(cars);
    }
}

export { CreateSpecificationCarController };
