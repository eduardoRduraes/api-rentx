import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IRequest {
    brand?: string;
    category_id?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private readonly carsRepository: ICarsRepository
    ) {}

    async execute({ brand, category_id, name }: IRequest) {
        const availableCars = await this.carsRepository.findAvailable(
            brand,
            category_id,
            name
        );
        return availableCars;
    }
}

export { ListAvailableCarsUseCase };
