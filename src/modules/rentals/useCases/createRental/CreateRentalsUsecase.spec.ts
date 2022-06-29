import { hash } from "bcryptjs";
import dayjs from "dayjs";

import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRental";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/InMemory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUsecase } from "./CreateRentalslUsecase.";

describe("Create Rentals", () => {
    let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
    let createRentalUsecase: CreateRentalUsecase;
    let dayjsDateProvider: DayjsDateProvider;
    let carsRepositoryInMemory: CarsRepositoryInMemory;

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createRentalUsecase = new CreateRentalUsecase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory
        );
    });

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

    const fakeUser: User[] = [
        Object.assign(new User(), {
            name: "user_profile",
            password: hash("12345678", 8),
            email: "user_profile@mail.com.br",
            driver_license: "32569-8525-12",
            isAdmin: false,
        }),
        Object.assign(new User(), {
            name: "admin_profile",
            password: hash("123456789", 8),
            email: "admin_profile@mail.com.br",
            driver_license: "58745-89-45",
            isAdmin: true,
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
            specification: [fakeSpecification[1].id, fakeSpecification[3].id],
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
            specification: [fakeSpecification[2].id, fakeSpecification[4].id],
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
            specification: [fakeSpecification[2].id],
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
            specification: [
                fakeSpecification[2].id,
                fakeSpecification[4].id,
                fakeSpecification[1].id,
            ],
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
            specification: [fakeSpecification[2].id, fakeSpecification[1].id],
        }),
    ];

    const makeFakeRentals = (): ICreateRentalDTO => ({
        user_id: fakeUser[1].id,
        car_id: fakeCars[3].id,
        expected_return_date: dayjs().add(1, "day").toDate(),
    });

    it("should be able to create a new rental", async () => {
        carsRepositoryInMemory.cars = fakeCars;
        const rental = makeFakeRentals();

        const response = await createRentalUsecase.execute(rental);
        expect(response).toHaveProperty("id");
        expect(response).toHaveProperty("start_date");
    });

    it("should not be able not to create a new rentals with cars is unavailable", async () => {
        rentalsRepositoryInMemory.rentals.push(
            Object.assign(new Rental(), {
                user_id: "id_user",
                car_id: fakeCars[3].id,
                start_date: new Date(),
                expected_return_date: dayjs().add(1, "day").toDate(),
            })
        );
        await expect(
            createRentalUsecase.execute(makeFakeRentals())
        ).rejects.toEqual(new AppError("Car is not unavailable!"));
    });

    it("should not be able not to create a new rental with a rental in progress for user", async () => {
        rentalsRepositoryInMemory.rentals.push(
            Object.assign(new Rental(), {
                user_id: fakeUser[1].id,
                car_id: "car_id",
                start_date: new Date(),
                expected_return_date: dayjs().add(1, "day").toDate(),
            })
        );
        await expect(
            createRentalUsecase.execute(makeFakeRentals())
        ).rejects.toEqual(
            new AppError("there`s a rental in progress for user!")
        );
    });

    it("should not be able to create a new rental with invalid return time", async () => {
        const rental = makeFakeRentals();
        rental.expected_return_date = dayjs().toDate();
        await expect(createRentalUsecase.execute(rental)).rejects.toEqual(
            new AppError("Invalid return time!")
        );
    });
});
