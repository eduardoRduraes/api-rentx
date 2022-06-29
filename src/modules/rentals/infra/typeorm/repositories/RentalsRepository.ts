import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "../../../dtos/ICreateRental";
import { IRentalsRepository } from "../../../repositories/IRentalRepository";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id);

        return rental;
    }

    async findOenRentalByCar(car_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: {
                car_id,
                end_date: null,
            },
        });

        return rental;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: {
                user_id,
                end_date: null,
            },
        });

        return rental;
    }

    async create({
        id,
        user_id,
        car_id,
        expected_return_date,
        end_date,
        total,
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            id,
            user_id,
            car_id,
            expected_return_date,
            end_date,
            total,
        });

        await this.repository.save(rental);
        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentals = await this.repository.find({
            where: { user_id },
            relations: ["car"],
        });
        return rentals;
    }
}

export { RentalsRepository };
