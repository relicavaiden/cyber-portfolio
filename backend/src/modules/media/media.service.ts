import prisma from "../../lib/prisma.js";
import type { MediaUploadInput } from "./media.types.js";
import { MediaType } from "../../generated/prisma/enums.js";
import { storeMedia } from "./s3.storage.js";

export const createMediaAsset = async (
    input: MediaUploadInput
) => {
    const storedMedia = await storeMedia({
        buffer: input.buffer,
        mimeType: input.mimeType,
        originalName: input.originalName,
    });

    const mediaAsset = await prisma.mediaAsset.create({
        data: {
            type: MediaType.IMAGE,
            storageKey: storedMedia.storageKey,
            url: storedMedia.url,
            mimeType: input.mimeType,
            altText: input.altText ?? null,
        },
    });

    return mediaAsset;
}