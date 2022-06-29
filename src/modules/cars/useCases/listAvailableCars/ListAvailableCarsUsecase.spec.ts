import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUsecase";

describe("List Cars", () => {
    let carsRepositoryInMemory: CarsRepositoryInMemory;
    let listCarsUseCase: ListAvailableCarsUseCase;

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

    it("should be able to list all available cars", async () => {
        carsRepositoryInMemory.cars = fakeCars;

        const listOne = await listCarsUseCase.execute({});
        expect(listOne).toEqual(fakeCars);

        carsRepositoryInMemory.cars[2].available = false;
        carsRepositoryInMemory.cars[4].available = false;

        const listTwo = await listCarsUseCase.execute({});
        expect(listTwo).not.toEqual(fakeCars);
    });

    it("should be able to list all available cars by name", async () => {
        carsRepositoryInMemory.cars = fakeCars;
        const listCars = await listCarsUseCase.execute({
            name: "CRV",
        });

        const crvCars = fakeCars.filter(
            (c) => c.available === true && c.name === "CRV"
        );

        expect(listCars).toEqual(crvCars);
    });

    it("should be able to list all available cars by brand", async () => {
        carsRepositoryInMemory.cars = fakeCars;
        const listCars = await listCarsUseCase.execute({
            brand: "HONDA",
        });

        const crvCars = fakeCars.filter(
            (c) => c.available === true && c.brand === "HONDA"
        );
        expect(listCars).toEqual(crvCars);
    });

    it("should be able to list all available cars by category_id", async () => {
        carsRepositoryInMemory.cars = fakeCars;
        const listCars = await listCarsUseCase.execute({
            category_id: fakeCategories[2].id,
        });

        const crvCars = fakeCars.filter(
            (c) =>
                c.available === true && c.category_id === fakeCategories[2].id
        );

        expect(listCars).toEqual(crvCars);
    });
});
