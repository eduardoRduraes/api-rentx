import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
    createToken({
        user_id,
        refresh_token,
        expires_date,
    }: ICreateUserTokenDTO): Promise<UserToken>;

    findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserToken>;

    deleteById(token_id: string): Promise<void>;

    findByRefreshToken(refresh_token: string): Promise<UserToken>;
}

export { IUsersTokensRepository };
