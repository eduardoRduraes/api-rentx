import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUsersTokensRepository } from "../IUsersTokensRepository";

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    users_token: UserToken[] = [];

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        return this.users_token.find((u) => u.refresh_token === refresh_token);
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken> {
        return this.users_token.find(
            (u) => u.user_id === user_id && u.refresh_token === refresh_token
        );
    }

    async deleteById(token_id: string): Promise<void> {
        const index = this.users_token.findIndex((u) => u.id === token_id);
        this.users_token.splice(index, 1);
    }

    async createToken({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const token = Object.assign(new UserToken(), {
            user_id,
            refresh_token,
            expires_date,
        });

        this.users_token = [token, ...this.users_token];
        return token;
    }
}

export { UsersTokensRepositoryInMemory };
