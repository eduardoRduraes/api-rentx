import { isDataView } from "util/types";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../ISpecificationRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    specifications: Specification[] = [];

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = Object.assign(new Specification(), {
            name,
            description,
        });
        this.specifications = [specification, ...this.specifications];
        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        return this.specifications.find((s) => s.name === name);
    }

    async findByIds(specification_ids: string[]): Promise<Specification[]> {
        const specificationList = this.specifications.filter((s) =>
            specification_ids.includes(s.id)
        );

        return specificationList;
    }
}

export { SpecificationsRepositoryInMemory };
