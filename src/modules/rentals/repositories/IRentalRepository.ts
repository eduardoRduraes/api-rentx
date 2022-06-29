import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRental";

import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    create({
        user_id,
        car_id,
        expected_return_date,
    }: ICreateRentalDTO): Promise<Rental>;

    findOpenRentalByUser(user_id: string): Promise<Rental>;

    findOenRentalByCar(car_id: string): Promise<Rental>;

    findById(id: string): Promise<Rental>;

    findByUser(user_id: string): Promise<Rental[]>;
}

export { IRentalsRepository };
