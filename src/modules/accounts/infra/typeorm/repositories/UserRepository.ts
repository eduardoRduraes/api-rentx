import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUsersRepository } from "../../../repositories/IUsersRespository";

class UserRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }
    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }

    async create({
        name,
        password,
        email,
        driver_license,
        avatar,
        id,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license,
            avatar,
            id,
        });

        await this.repository.save(user);
    }
    async findByUserEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user ?? undefined;
    }
    async list(): Promise<ICreateUserDTO[]> {
        const userList = await this.repository.find();
        return userList.length !== 0 ? userList : undefined;
    }
}

export { UserRepository };
