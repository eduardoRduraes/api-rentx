import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRental";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    rentals: Rental[] = [];

    async findOenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find((r) => r.car_id === car_id && !r.end_date);
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find((r) => r.user_id === user_id && !r.end_date);
    }

    async findById(id: string): Promise<Rental> {
        return this.rentals.find((r) => r.id === id);
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        return this.rentals.filter((r) => r.user_id === user_id);
    }

    async create({
        user_id,
        car_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = Object.assign(new Rental(), {
            user_id,
            car_id,
            expected_return_date,
            start_date: new Date(),
        });

        this.rentals = [rental, ...this.rentals];
        return rental;
    }
}

export { RentalsRepositoryInMemory };
