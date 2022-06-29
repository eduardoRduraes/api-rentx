import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository {
    create({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<void>;
    findByUserEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    list(): Promise<ICreateUserDTO[]>;
}

export { IUsersRepository };
