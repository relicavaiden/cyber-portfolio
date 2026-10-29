import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import type { StoreMedia } from "./media.storage.js";
import { extname } from "node:path";
import { AWS_REGION, S3_BUCKET, MEDIA_BASE_URL } from "../../config/env.js";



const s3 = new S3Client({
    region: AWS_REGION,
});


export const storeMedia: StoreMedia = async (input) => {
    const extension = extname(input.originalName).toLowerCase();
    const storageKey = `media/&{randomUUID()}${extension}`;

    const command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: storageKey,
        Body: input.buffer,
        ContentType: input.mimeType,
    });

    await s3.send(command);

    const url = `${MEDIA_BASE_URL}/${storageKey}`;

    return {
        storageKey,
        url,
    };
};