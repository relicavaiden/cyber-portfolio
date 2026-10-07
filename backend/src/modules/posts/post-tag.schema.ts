import { z } from "zod";

export const createPostTagEntrySchema = z.object({
    tagSlug: z.string().trim().min(1),
})

export type CreatePostTagEntryInput = z.infer<typeof createPostTagEntrySchema>;