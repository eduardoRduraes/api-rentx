import { container } from "tsyringe";

import "@shared/container/providers";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRespository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { UpdateUserAvatarUseCase } from "@modules/accounts/updateUserAvatar/UpdateUserAvatarUseCase";
import { CarsImageRepository } from "@modules/cars/infra/typeorm/repositoires/CarsImageRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositoires/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositoires/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositoires/SpecificationRepository";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarsImageRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { ImportCategoryController } from "@modules/cars/useCases/importCategory/ImportCategoryController";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalRepository";

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationRepository",
    SpecificationRepository
);

container.registerSingleton<ImportCategoryController>(
    "ImportCategoryController",
    ImportCategoryController
);
container.registerSingleton<ICarsImageRepository>(
    "CarsImageRepository",
    CarsImageRepository
);

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
);
container.registerSingleton<IUsersRepository>("UserRepository", UserRepository);

container.registerSingleton<UpdateUserAvatarUseCase>(
    "updateUserAvatarUseCase",
    UpdateUserAvatarUseCase
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);
container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
);
