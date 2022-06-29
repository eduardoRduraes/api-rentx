import { getRepository, Repository } from "typeorm";

import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";

import { CarImage } from "../entities/CarImage";

class CarsImageRepository implements ICarsImageRepository {
    private repository: Repository<CarImage>;
    constructor() {
        this.repository = getRepository(CarImage);
    }
    async create(image_name: string, car_id: string): Promise<CarImage> {
        const carImage = this.repository.create({ image_name, car_id });

        await this.repository.save(carImage);

        return carImage;
    }
}

export { CarsImageRepository };
