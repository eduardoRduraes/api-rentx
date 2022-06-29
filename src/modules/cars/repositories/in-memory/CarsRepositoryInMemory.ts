/* eslint-disable array-callback-return */
/* eslint-disable no-return-assign */
/* eslint-disable consistent-return */
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
    cars: Car[] = [];

    async findById(car_id: string): Promise<Car> {
        return this.cars.find((c) => c.id === car_id);
    }

    async create({
        name,
        description,
        daily_rate,
        fine_amount,
        category_id,
        brand,
        license_plate,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car> {
        const car = Object.assign(new Car(), {
            name,
            description,
            daily_rate,
            fine_amount,
            category_id,
            brand,
            license_plate,
            specifications,
            id,
        });

        this.cars = [car, ...this.cars];
        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find((l) => l.license_plate === license_plate);
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const list = this.cars.filter((c) => {
            if (c.available === true) {
                if (!brand && !category_id && !name) return c;

                if (
                    (brand && c.brand === brand) ||
                    (category_id && c.category_id === category_id) ||
                    (name && c.name === name)
                ) {
                    return c;
                }
            }
            return null;
        });

        return list;
    }

    async updateAvailable(car_id: string, available: boolean): Promise<void> {
        const index = this.cars.findIndex((car) => car.id === car_id);
        this.cars[index].available = available;
    }
}

export { CarsRepositoryInMemory };
