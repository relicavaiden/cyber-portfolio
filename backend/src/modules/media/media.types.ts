export type MediaUploadInput = {
    originalName: string;
    mimeType: string;
    size: number;
    buffer: Buffer;
    altText?: string;
};

const normalizeMediaUpload = (
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