import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { IUsersRepository } from "../IUsersRespository";

class UsersRepositoryInMemory implements IUsersRepository {
    users: User[] = [];

    async create({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        this.users = [
            Object.assign(new User(), {
                name,
                password,
                email,
                driver_license,
            }),
            ...this.users,
        ];
    }
    async findByUserEmail(email: string): Promise<User> {
        return this.users.find((u) => u.email === email);
    }
    async findById(id: string): Promise<User> {
        return this.users.find((u) => u.id === id);
    }
    async list(): Promise<ICreateUserDTO[]> {
        return this.users;
    }
}

export { UsersRepositoryInMemory };
