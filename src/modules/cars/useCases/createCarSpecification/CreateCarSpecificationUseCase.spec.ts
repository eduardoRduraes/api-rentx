import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUsecase } from "./CreateCarSpecificationUsecase";

interface ISpecificationCars {
    car_id: string;
    specifications_id: string[];
}

describe("Create Car Specification", () => {
    let createCarSpecificationUsecase: CreateCarSpecificationUsecase;
    let carsRepositoryInMemory: CarsRepositoryInMemory;
    let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUsecase = new CreateCarSpecificationUsecase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    const fakeCategories: Category[] = [
        Object.assign(new Category(), {
            name: "SEDAN",
            description:
                "Carro para 5 pessoas com carroceira divida em 3 volumes e porta-mala mediano",
        }),
        Object.assign(new Category(), {
            name: "HATCH",
            description:
                "Carro para 5 pessoas com carroceira divida em 2 volumes e porta-mala pequeno",
        }),
        Object.assign(new Category(), {
            name: "SUV",
            description:
                "Carro para 5 pessoas com carroceira divida em 2 volumes e porta-mala grande",
        }),
    ];

    const fakeCars: Car[] = [
        Object.assign(new Car(), {
            name: "COBALT",
            description:
                "1.8 MPFI LTZ 8V FLEX 4P MANUAL, modelo 2014/2014, cor Prata",
            daily_rate: 60,
            fine_amount: 90,
            category_id: fakeCategories[0].id,
            brand: "chevrolet",
            license_plate: "HJI-1U60",
        }),
        Object.assign(new Car(), {
            name: "CRV",
            description:
                "2.0 LX 4X2 16V GASOLINA 4P AUTOMÁTICO, modelo 2012/2012, cor Prata",
            daily_rate: 150,
            fine_amount: 100,
            category_id: fakeCategories[2].id,
            brand: "HONDA",
            license_plate: "AWI-1J52",
        }),
        Object.assign(new Car(), {
            name: "ELANTRA",
            description:
                "1.8 GLS 16V GASOLINA 4P AUTOMÁTICO, modelo 2013/2013, cor Prata",
            daily_rate: 60,
            fine_amount: 90,
            category_id: fakeCategories[0].id,
            brand: "HYUNDAI",
            license_plate: "AWS-1J51",
        }),
        Object.assign(new Car(), {
            name: "IX35",
            description:
                "2.0 MPI 4X2 16V FLEX 4P MANUAL, modelo 2013/2013, cor Preto",
            daily_rate: 40,
            fine_amount: 120,
            category_id: fakeCategories[1].id,
            brand: "HYUNDAI",
            license_plate: "QWS-1J51",
        }),
        Object.assign(new Car(), {
            name: "COBALT",
            description:
                "1.8 MPFI LTZ 8V FLEX 4P MANUAL, modelo 2014/2014, cor Prata",
            daily_rate: 60,
            fine_amount: 90,
            category_id: fakeCategories[0].id,
            brand: "chevrolet",
            license_plate: "HJI-1W61",
        }),
        Object.assign(new Car(), {
            name: "CRV",
            description:
                "2.0 LX 4X2 16V GASOLINA 4P AUTOMÁTICO, modelo 2012/2012, cor Vermelho",
            daily_rate: 150,
            fine_amount: 100,
            category_id: fakeCategories[2].id,
            brand: "HONDA",
            license_plate: "kWA-1U43",
        }),
    ];

    const fakeSpecification: Specification[] = [
        Object.assign(new Specification(), {
            name: "Specificatoin fake 01",
            description: "description fake 01",
        }),
        Object.assign(new Specification(), {
            name: "Specificatoin fake 02",
            description: "description fake 02",
        }),
        Object.assign(new Specification(), {
            name: "Specificatoin fake 03",
            description: "description fake 03",
        }),
        Object.assign(new Specification(), {
            name: "Specificatoin fake 04",
            description: "description fake 04",
        }),
        Object.assign(new Specification(), {
            name: "Specificatoin fake 05",
            description: "description fake 05",
        }),
        Object.assign(new Specification(), {
            name: "Specificatoin fake 06",
            description: "description fake 06",
        }),
        Object.assign(new Specification(), {
            name: "Specificatoin fake 07",
            description: "description fake 07",
        }),
    ];

    const makeFakeSpecification = (): ISpecificationCars => ({
        car_id: fakeCars[2].id,
        specifications_id: [
            fakeSpecification[2].id,
            fakeSpecification[4].id,
            fakeSpecification[6].id,
        ],
    });

    it("should be able add a new specification to the car", async () => {
        carsRepositoryInMemory.cars = fakeCars;
        specificationsRepositoryInMemory.specifications = fakeSpecification;

        const specificationCar = await createCarSpecificationUsecase.execute(
            makeFakeSpecification()
        );

        expect(specificationCar).toHaveProperty("specifications");
        expect(specificationCar.specifications.length).toBe(3);
    });

    it("should not to be able add a new specification to a now-existent car", async () => {
        await expect(
            createCarSpecificationUsecase.execute(makeFakeSpecification())
        ).rejects.toEqual(new AppError("Car does not exits!", 400));
    });
});
