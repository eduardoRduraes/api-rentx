import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    car_id: string;
    user_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUsecase {
    constructor(
        @inject("RentalsRepository")
        private readonly createRentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private readonly dayjsDateProvider: IDateProvider,
        @inject("CarsRepository")
        private readonly carsRepository: ICarsRepository
    ) {}

    async execute({
        car_id,
        user_id,
        expected_return_date,
    }: IRequest): Promise<Rental> {
        const minimumHour = 24;

        const carUnAvailable =
            await this.createRentalsRepository.findOenRentalByCar(car_id);

        if (carUnAvailable) throw new AppError("Car is not unavailable!");

        const rentalOpenToUser =
            await this.createRentalsRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser)
            throw new AppError("there`s a rental in progress for user!");

        const dateNow = this.dayjsDateProvider.dateNow();
        const compare = this.dayjsDateProvider.compareInHours(
            dateNow,
            expected_return_date
        );

        if (compare < minimumHour) throw new AppError("Invalid return time!");

        await this.carsRepository.updateAvailable(car_id, false);

        const rental = await this.createRentalsRepository.create({
            car_id,
            user_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUsecase };
