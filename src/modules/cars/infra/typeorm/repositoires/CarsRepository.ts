import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async findById(car_id: string): Promise<Car> {
        const car = await this.repository.findOne(car_id);
        return car;
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]> {
        const carsQuery = await this.repository
            .createQueryBuilder("car")
            .where("available = :available", {
                available: true,
            });

        if (brand) {
            carsQuery.andWhere("car.brand = :brand", { brand });
        }
        if (category_id) {
            carsQuery.andWhere("car.category_id = :category_id", {
                category_id,
            });
        }
        if (name) {
            carsQuery.andWhere("car.name = :name", { name });
        }

        const cars = await carsQuery.getMany();
        return cars;
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
        const car = this.repository.create({
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

        const createCar = await this.repository.save(car);
        return createCar;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });
        return car;
    }

    async updateAvailable(car_id: string, available: boolean): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update()
            .set({ available })
            .where("id = :car_id")
            .setParameters({ car_id })
            .execute();
    }
}

export { CarsRepository };
