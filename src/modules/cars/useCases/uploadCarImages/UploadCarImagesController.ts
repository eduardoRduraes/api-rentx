import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./UploadCarImagesUseCase";

interface IFiles {
    filename: string;
}

class UploadCarImagesController {
    async handle(request: Request, response: Response): Promise<Response> {
        const images = request.files as IFiles[];
        const { id } = request.params;

        const uploadCarImagesUsecase = container.resolve(
            UploadCarImagesUseCase
        );

        const images_name = images.map((file) => file.filename);

        await uploadCarImagesUsecase.execute({
            images_name,
            car_id: id,
        });

        return response.status(201).send();
    }
}

export { UploadCarImagesController };
