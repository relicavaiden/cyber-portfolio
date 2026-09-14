import prisma from "../../lib/prisma.js";

import { PostStatus } from "../../generated/prisma/enums.js";

export const getPublishedPosts = async () => {
    const posts = await prisma.post.findMany(
        {
            where: {
                status: PostStatus.PUBLISHED,
            }
        }
    )

    return posts;
}