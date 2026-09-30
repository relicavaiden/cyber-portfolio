import { z } from "zod";

export const createSeriesEntrySchema = z.object({
    postSlug: z.string().trim().min(1),
    position: z.number().int().positive(),
})

export type CreateSeriesEntryInput = z.infer<typeof createSeriesEntrySchema>;