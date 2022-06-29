import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRespository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UserRepository")
        private readonly userRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private readonly usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private readonly dateProvider: IDateProvider
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByUserEmail(email);

        const {
            secret_token,
            expires_in_token,
            secret_refresh_token,
            expires_in_refresh_token,
            expires_refresh_token_days,
        } = auth;

        if (!user) throw new AppError("Email or password incorrect");

        const passwordIsValid = await compare(password, user.password);

        if (!passwordIsValid) throw new AppError("Email or password incorrect");

        const token = jwt.sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token,
        });

        const refresh_token = jwt.sign({ email }, secret_refresh_token, {
            subject: user.id,
            expiresIn: expires_in_refresh_token,
        });

        const refresh_token_expires_date = this.dateProvider.addDays(
            expires_refresh_token_days
        );

        await this.usersTokensRepository.createToken({
            user_id: user.id,
            refresh_token,
            expires_date: refresh_token_expires_date,
        });

        const response: IResponse = {
            user: {
                name: user.name,
                email: user.email,
            },
            token,
            refresh_token,
        };

        return response;
    }
}

export { AuthenticateUserUseCase };
