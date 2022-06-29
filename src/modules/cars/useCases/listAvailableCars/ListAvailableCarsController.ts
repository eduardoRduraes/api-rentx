import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUsecase";

class ListAvailableController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { brand, category_id, name } = request.query;

        const listCarsUseCase = container.resolve(ListAvailableCarsUseCase);
        const listCars = await listCarsUseCase.execute({
            brand: brand as string,
            category_id: category_id as string,
            name: name as string,
        });

        return response.status(201).json(listCars);
    }
}

export { ListAvailableController };
