import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRespository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}
@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject("UserRepository")
        private readonly usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private readonly usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private readonly dateProvider: IDateProvider
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const user_token = await this.usersTokensRepository.findByRefreshToken(
            token
        );

        if (!user_token) {
            throw new AppError("Token invalid!");
        }

        const date_expires = this.dateProvider.compareIfBefore(
            user_token.expires_date,
            this.dateProvider.dateNow()
        );

        if (date_expires) {
            throw new AppError("Token expired!");
        }

        const user = await this.usersRepository.findById(user_token.user_id);
        user.password = await hash(password, 8);

        await this.usersRepository.create(
            Object.assign(user, {
                password: await hash(password, 8),
            })
        );

        await this.usersTokensRepository.deleteById(user_token.id);
    }
}

export { ResetPasswordUserUseCase };
