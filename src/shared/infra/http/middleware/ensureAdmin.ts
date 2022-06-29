import { NextFunction, Request, Response } from "express";

import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const { id } = request.user;
    const userRepository = new UserRepository();

    const userIsAdmin = await userRepository.findById(id);

    if (!userIsAdmin.isAdmin) {
        throw new AppError("user isn`t admin", 401);
    }

    return next();
}
