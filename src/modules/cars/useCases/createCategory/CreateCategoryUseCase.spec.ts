import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUsecase } from "./CreateCategoryUseCase";

let createCategoryUsecase: CreateCategoryUsecase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create category", () => {
    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUsecase = new CreateCategoryUsecase(
            categoriesRepositoryInMemory
        );
    });

    const makeFakeCategory = () => ({
        name: "Category Test",
        description: "Category description Test",
    });

    it("should be able to create a new category", async () => {
        await createCategoryUsecase.execute(makeFakeCategory());

        const categoryCreate = await categoriesRepositoryInMemory.findByName(
            makeFakeCategory().name
        );
        expect(categoryCreate).toHaveProperty("id");
    });

    it("should not be able to create a new category with name exists", async () => {
        await createCategoryUsecase.execute(makeFakeCategory());
        await expect(
            createCategoryUsecase.execute(makeFakeCategory())
        ).rejects.toEqual(new AppError("Category already exists!"));
    });
});
