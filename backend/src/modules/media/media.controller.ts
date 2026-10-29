import type { Request, Response } from "express";
import { AppError } from "../../lib/AppError.js";
import { normalizeMediaUpload } from "./media.normalizer.js";
import { createMediaAsset } from "./media.service.js";
import { mediaMetadataSchema, mediaMimeTypeSchema } from "./media.schema.js";

export const mediaUploadController = async (
    req: Request,
    res: Response
) => {

    if (!req.file) {
        throw new AppError("Image file is required", 400);
    }

    const metadataResult = mediaMetadataSchema.safeParse(req.body);

    if (!metadataResult.success) {
        throw new AppError("Invalid media metadata", 400);
    }

    const mimeResult = mediaMimeTypeSchema.safeParse(req.file.mimetype);

    if (!mimeResult.success) {
        throw new AppError("Unsupported image type", 400);
    }

    const mediaInput = normalizeMediaUpload (
        req.file,
        metadataResult.data.altText
    );

    const mediaAsset = await createMediaAsset(mediaInput);

    return res.status(201).json(mediaAsset);
}
