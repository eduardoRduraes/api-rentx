import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuiV4 } from "uuid";

import { Car } from "./Car";

@Entity("cars_image")
class CarImage {
    @PrimaryColumn()
    id: string;

    @Column()
    image_name: string;

    @Column()
    car_id: string;

    @OneToMany(() => Car, (car) => car.id)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuiV4();
        }
    }
}

export { CarImage };
