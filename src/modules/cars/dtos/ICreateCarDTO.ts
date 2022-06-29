import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateCarDTO {
    name: string;
    description: string;
    daily_rate: number;
    fine_amount: number;
    category_id: string;
    brand: string;
    license_plate: string;
    specifications?: Specification[];
    id?: string;
}

export { ICreateCarDTO };
