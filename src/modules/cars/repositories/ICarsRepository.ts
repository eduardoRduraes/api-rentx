import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
    create({
        name,
        description,
        daily_rate,
        fine_amount,
        category_id,
        brand,
        license_plate,
        specifications,
        id,
    }: ICreateCarDTO): Promise<Car>;

    findAvailable(
        brand?: string,
        category_id?: string,
        name?: string
    ): Promise<Car[]>;

    findById(car_id: string): Promise<Car>;

    findByLicensePlate(license_plate: string): Promise<Car>;

    updateAvailable(car_id: string, available: boolean): Promise<void>;
}

export { ICarsRepository };
