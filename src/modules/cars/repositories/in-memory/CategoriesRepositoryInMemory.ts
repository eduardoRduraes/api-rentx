import { Category } from "@modules/cars/infra/typeorm/entities/Category";

import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
    private categories: Category[] = [];

    async findByName(name: string): Promise<Category> {
        return this.categories.find((m) => m.name === name);
    }
    async list(): Promise<Category[]> {
        return this.categories;
    }
    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        this.categories = [
            Object.assign(new Category(), {
                name,
                description,
            }),
            ...this.categories,
        ];
    }
}

export { CategoriesRepositoryInMemory };
