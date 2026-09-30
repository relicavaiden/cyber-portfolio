import prisma from "../../lib/prisma.js";
import { AppError } from "../../lib/AppError.js";

import type { CreatePostRelationshipInput } from "./post-relationship.schema.js";

export const createPostRelationship = async (
    sourcePostSlug: string,
    input: CreatePostRelationshipInput
) => {
    const sourcePost = await prisma.post.findUnique({
        where: {
            slug: sourcePostSlug,
        },
    });

    if (!sourcePost) {
        throw new AppError("Source post not found", 404)
    }

    const targetPost = await prisma.post.findUnique({
        where: {
            slug: input.targetPostSlug,
        },
    });

    if (!targetPost) {
        throw new AppError("Target post not found", 404);
    }

    if (sourcePost.id === targetPost.id) {
        throw new AppError("Post cannot relate to itself", 400);
    }

    const existingRelationship = await prisma.postRelationship.findFirst({
        where: {
            sourcePostId: sourcePost.id,
            targetPostId: targetPost.id,
            relationshipType: input.relationshipType,
        },
    });

    if (existingRelationship) {
        throw new AppError("Post relationship already exists", 409);
    }

    const createdRelationship = await prisma.postRelationship.create({
        data: {
            sourcePostId: sourcePost.id,
            targetPostId: targetPost.id,
            relationshipType: input.relationshipType,
            targetAnchor: input.targetAnchor ?? null,
        },
    });

    return createdRelationship;
}