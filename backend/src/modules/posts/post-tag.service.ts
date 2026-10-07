import prisma from "../../lib/prisma.js";
import { AppError } from "../../lib/AppError.js";

import type { CreatePostTagEntryInput } from "./post-tag.schema.js";

export const createTagEntry = async (
    postSlug: string,
    input: CreatePostTagEntryInput
) => {
    const post = await prisma.post.findUnique({
        where: {
            slug: postSlug,
        },
    });

    if (!post) {
        throw new AppError("Post not found", 404)
    }

    const tag = await prisma.tag.findUnique ({
        where: {
            slug: input.tagSlug,
        },
    });

    if (!tag) {
        throw new AppError("Tag not found", 404)
    }

    const existingPostTag = await prisma.postTag.findUnique({
        where: {
            postId_tagId: {
                postId: post.id,
                tagId: tag.id,
            },
        },
    });

    if (existingPostTag) {
        throw new AppError("Tag already attached to post", 409)
    }

    const tagEntry = await prisma.postTag.create({
        data: {
            postId: post.id,
            tagId: tag.id,
        }
    })

    return tagEntry;
}

