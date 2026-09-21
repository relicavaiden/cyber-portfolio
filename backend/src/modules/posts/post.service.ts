import prisma from "../../lib/prisma.js";
import type { CreatePostInput } from "./post.schema.js";
import { AppError } from "../../lib/AppError.js";
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

export const createPost = async (input: CreatePostInput) => {
    const slug = input.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

        const existingPost = await prisma.post.findUnique({
            where: { slug }
        })

        if (existingPost) {
            throw new AppError("Post slug already exists", 409);
        }

        const post = prisma.post.create({
            data: {
                title: input.title,
                slug,
                excerpt: input.excerpt ?? null,
                body: input.body ?? null,
            },
        });

        return post;
};

export const getPostBySlug = async (slug: string) => {
    const post = await prisma.post.findUnique({
        where: { 
            slug,
            status: PostStatus.PUBLISHED,
        }
    });

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    return post;
}

export const publishPost = async (slug: string) => {
    const post = await prisma.post.findUnique({
        where: {
            slug,
        }
    });

    if (!post) {
        throw new AppError("Post not found", 404)
    }

    if (post.status === PostStatus.PUBLISHED) {
        throw new AppError("Post is already published", 409);
    }

    const publishedPost = await prisma.post.update({
        where: {
            slug,
        },
        data: {
            status: PostStatus.PUBLISHED,
            publishedAt: post.publishedAt ?? new Date()
        }
    })

    return publishedPost;
}