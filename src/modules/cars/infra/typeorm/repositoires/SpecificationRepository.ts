import { getRepository, Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
    ICreateSpecificationDTO,
    ISpecificationsRepository,
} from "../../../repositories/ISpecificationRepository";

class SpecificationRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }

    async findByIds(specification_ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.findByIds(
            specification_ids
        );

        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });
        return specification as Specification;
    }

    async create({
        name,
        description,
    }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = this.repository.create({ name, description });

        await this.repository.save(specification);
        return specification;
    }
}

export { SpecificationRepository };
