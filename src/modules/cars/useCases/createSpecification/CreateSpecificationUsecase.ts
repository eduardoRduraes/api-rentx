import { inject, injectable } from "tsyringe";

import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}
@injectable()
class CreateSpecificationUsecase {
    constructor(
        @inject("SpecificationRepository")
        private readonly specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const specificationAlReadyExist =
            await this.specificationsRepository.findByName(name);

        if (specificationAlReadyExist)
            throw new AppError("Specification already exists!");

        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationUsecase };
