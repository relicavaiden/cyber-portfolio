import { z } from "zod";
import { RelationshipType } from "../../generated/prisma/enums.js";

export const createPostRelationshipSchema = z.object({
    targetPostSlug: z.string().trim().min(1),
    relationshipType: z.enum(RelationshipType),
    targetAnchor: z.string().trim().min(1).optional()
})

export type CreatePostRelationshipInput = z.infer<typeof createPostRelationshipSchema>;