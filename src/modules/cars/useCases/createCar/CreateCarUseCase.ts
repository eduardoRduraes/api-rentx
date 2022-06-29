import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    fine_amount: number;
    category_id: string;
    brand: string;
    license_plate: string;
    specifications?: Specification[];
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private readonly carsRepository: ICarsRepository
    ) {}

    async execute({
        name,
        description,
        daily_rate,
        fine_amount,
        category_id,
        brand,
        license_plate,
        specifications,
    }: IRequest): Promise<Car> {
        const carAlreadExists = await this.carsRepository.findByLicensePlate(
            license_plate
        );

        if (carAlreadExists) throw new AppError("Car already exists!");

        const createCar = await this.carsRepository.create({
            name,
            description,
            daily_rate,
            fine_amount,
            category_id,
            brand,
            license_plate,
            specifications,
        });

        return createCar;
    }
}

export { CreateCarUseCase };
