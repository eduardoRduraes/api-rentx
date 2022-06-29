import { getRepository, Repository } from "typeorm";

import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";

import { UserToken } from "../entities/UserToken";

class UsersTokensRepository implements IUsersTokensRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    async createToken({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const user_token = this.repository.create({
            user_id,
            refresh_token,
            expires_date,
        });

        await this.repository.save(user_token);

        return user_token;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        const usersTokens = await this.repository.findOne({
            where: { user_id, refresh_token },
        });

        return usersTokens;
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = await this.repository.findOne({ refresh_token });
        return userToken;
    }

    async deleteById(token_id: string): Promise<void> {
        await this.repository.delete({ id: token_id });
    }
}

export { UsersTokensRepository };
