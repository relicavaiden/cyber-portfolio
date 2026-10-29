import { z } from "zod";

export const mediaMetadataSchema = z.object({
    altText: z.string().trim().optional(),
});

export const mediaMimeTypeSchema = z.enum([
    "image/jpeg",
    "image/png",
    "image/webp",
]);

export type CreateMediaAssetInput = z.infer<typeof mediaMetadataSchema>;