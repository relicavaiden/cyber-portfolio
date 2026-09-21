import { z } from "zod";

export const createPostSchema = z.object({
    title: z.string().trim().min(1),
    excerpt: z.string().optional(),
    body: z.string().optional(),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;