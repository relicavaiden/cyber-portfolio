import prisma from "../lib/prisma.js";
import { PostStatus } from "../generated/prisma/enums.js";

export const TestPosts = async() => {
    try {
        await prisma.post.createMany({
            data: [
                {
                    title: "Testing Post",
                    slug: "slug-testing",
                    status: PostStatus.PUBLISHED,
                    publishedAt: new Date()
                },
                {
                    title: "Testing Draft",
                    slug: "draft-testing",
                    status: PostStatus.DRAFT,
                    publishedAt: new Date()
                }
            ]
        })
    } catch (error) {
        console.log("Posts were not retrived", error);
        await prisma.$disconnect();
        process.exit(1);
    }

    await prisma.$disconnect();
    process.exit(0);
}

TestPosts()