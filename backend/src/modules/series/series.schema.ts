import { z } from "zod";

export const createSeriesSchema = z.object({
    title: z.string().trim().min(1),
    description: z.string().trim().optional(),
});

export type CreateSeriesInput = z.infer<typeof createSeriesSchema>