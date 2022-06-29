import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListRentalsByUserUseCase {
    constructor(
        @inject("RentalsRepository")
        private readonly rentalsRepository: IRentalsRepository
    ) {}

    async execute(user_id: string): Promise<Rental[]> {
        const rentals = await this.rentalsRepository.findByUser(user_id);

        if (!rentals) {
            throw new AppError("There are no rentals saved for this user!");
        }

        return rentals;
    }
}

export { ListRentalsByUserUseCase };
