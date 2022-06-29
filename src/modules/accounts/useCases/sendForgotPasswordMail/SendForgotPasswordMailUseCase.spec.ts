import { v4 as uuid } from "uuid";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUsecase";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

describe("SendForgotPasswordMail", () => {
    let userRepository: UsersRepositoryInMemory;
    let usersTokensRepository: UsersTokensRepositoryInMemory;
    let mailProvider: MailProviderInMemory;
    let dateProvider: DayjsDateProvider;

    let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

    let createUserUseCase: CreateUserUseCase;

    beforeEach(() => {
        userRepository = new UsersRepositoryInMemory();
        usersTokensRepository = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            userRepository,
            usersTokensRepository,
            dateProvider,
            mailProvider
        );

        createUserUseCase = new CreateUserUseCase(userRepository);
    });

    const user_id = uuid();

    const makeFakeUser: ICreateUserDTO = {
        id: user_id,
        name: "Eduardo R Duraes",
        password: "12345678",
        email: "username@mail.com",
        driver_license: "dsafewrq56467qr43",
    };

    it("should be able to send a forgot password mail to user", async () => {
        const { email } = makeFakeUser;

        await createUserUseCase.execute(makeFakeUser);
        const spyMailer = jest.spyOn(mailProvider, "sendMail");

        await sendForgotPasswordMailUseCase.execute(email);

        expect(spyMailer).toHaveBeenCalled();
    });

    it("should not be able to send an email if user does not exists", async () => {
        await createUserUseCase.execute(makeFakeUser);
        await expect(
            sendForgotPasswordMailUseCase.execute("false@mail.com")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("should be able to create an users token", async () => {
        const { email } = makeFakeUser;

        await createUserUseCase.execute(makeFakeUser);
        const spyToken = jest.spyOn(usersTokensRepository, "createToken");

        await sendForgotPasswordMailUseCase.execute(email);

        expect(spyToken).toHaveBeenCalled();
    });
});
