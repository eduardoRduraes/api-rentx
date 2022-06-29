import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUsecase {
    constructor(
        @inject("CategoriesRepository")
        private readonly categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlReadyExist = await this.categoriesRepository.findByName(
            name
        );

        if (categoryAlReadyExist)
            throw new AppError("Category already exists!");

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryUsecase };
