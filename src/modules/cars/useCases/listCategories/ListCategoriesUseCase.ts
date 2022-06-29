import { inject, injectable } from "tsyringe";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class ListCategoriesUsecase {
    constructor(
        @inject("CategoriesRepository")
        private readonly categoriesRepository: ICategoriesRepository
    ) {}

    async execute(): Promise<Category[]> {
        const listCategories = await this.categoriesRepository.list();
        if (listCategories.length === 0)
            throw new AppError("There is no categories");

        return listCategories;
    }
}

export { ListCategoriesUsecase };
