import { CarImage } from "../infra/typeorm/entities/CarImage";

interface ICarsImageRepository {
    create(images_name: string, car_id: string): Promise<CarImage>;
}

export { ICarsImageRepository };
