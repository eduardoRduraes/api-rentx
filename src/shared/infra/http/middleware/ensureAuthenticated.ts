import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    user_id: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { authorization } = request.headers;

    if (!authorization) {
        throw new AppError("Token missing", 401);
    }

    const [, token] = authorization.split(" ");

    try {
        const { sub: user_id } = verify(token, auth.secret_token) as IPayload;

        const userRepository = new UserRepository();
        const user = await userRepository.findById(user_id);

        if (!user) throw new AppError("user does not exists", 401);

        request.user = {
            id: user_id,
        };
        next();
    } catch (error) {
        throw new AppError("invalid token", 401);
    }
}
