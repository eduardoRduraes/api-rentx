import { v4 as uuid } from "uuid";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUsecase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUsecase";

let authenticate: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;
describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticate = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    const user_id = uuid();

    const makeFakeUser: ICreateUserDTO = {
        id: user_id,
        name: "Eduardo R Duraes",
        password: "12345989",
        email: "username@mail.com",
        driver_license: "dsafewrq56467qr43",
    };

    it("should be able to authenticate an user", async () => {
        await createUserUseCase.execute(makeFakeUser);
        const token = await authenticate.execute({
            email: "username@mail.com",
            password: "12345989",
        });
        expect(token).toHaveProperty("token");
    });

    it("should not be able to authenticate an nonexistent user", async () => {
        await expect(
            authenticate.execute({
                email: "false@gmail.com",
                password: makeFakeUser.password,
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });

    it("should not be able to authenticate with incorrect password", async () => {
        await createUserUseCase.execute(makeFakeUser);

        await expect(
            authenticate.execute({
                email: makeFakeUser.email,
                password: "1234",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });

    it("should not be able to authenticate with incorrect E-mail", async () => {
        await createUserUseCase.execute(makeFakeUser);

        await expect(
            authenticate.execute({
                email: "false@mail.com",
                password: makeFakeUser.password,
            })
        ).rejects.toEqual(new AppError("Email or password incorrect"));
    });
});
