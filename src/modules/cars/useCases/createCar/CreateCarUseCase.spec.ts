import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

describe("Create a new car", () => {
    let createCarUseCase: CreateCarUseCase;
    let carsRepositoryInMemory: CarsRepositoryInMemory;

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    const makeFakeCategory = (): Category =>
        Object.assign(new Category(), {
            name: "FakeNameCategory",
            description: "Fake Description",
        });

    const makeFakeCar = (): ICreateCarDTO => ({
        name: "Fake NameCar",
        description: "Fake description Cars",
        daily_rate: 100,
        fine_amount: 60,
        category_id: makeFakeCategory().id,
        brand: "Fake brand",
        license_plate: "OMS-7H30",
    });

    it("should be able to create a new car", async () => {
        const response = await createCarUseCase.execute(makeFakeCar());

        expect(response).toHaveProperty("id");
    });

    it("should not be able to create a car with exists license_plate ", async () => {
        await createCarUseCase.execute(makeFakeCar());

        expect(
            createCarUseCase.execute(
                Object.assign(makeFakeCar(), { name: "Fake NameCar2" })
            )
        ).rejects.toEqual(new AppError("Car already exists!"));
    });

    it("should be able to create a new car with available true by default", async () => {
        const { available } = await carsRepositoryInMemory.create(
            makeFakeCar()
        );

        expect(available).toBe(true);
    });
});
