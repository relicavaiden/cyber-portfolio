import type { MediaUploadInput } from "./media.types.js";

export const normalizeMediaUpload = (
    file: Express.Multer.File,
    altText?: string
): MediaUploadInput => {
    return {
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size,
        buffer: file.buffer,
        ...(altText !== undefined && { altText }),
    };
};