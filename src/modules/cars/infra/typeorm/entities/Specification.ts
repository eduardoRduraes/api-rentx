import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Car } from "./Car";

@Entity("specifications")
class Specification {
    @PrimaryColumn()
    readonly id?: string;

    @Column()
    name: string;

    @Column()
    description: string;

    // @ManyToMany(() => Car)
    // @JoinTable({
    //     name: "specificaition_cars",
    //     joinColumns: [{ name: "specification_id" }],
    //     inverseJoinColumns: [{ name: "car_id" }],
    // })
    // cars: Car;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Specification };
