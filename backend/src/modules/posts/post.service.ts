import prisma from "../../lib/prisma.js";
import type { CreatePostInput, UpdatePostInput } from "./post.schema.js";
import { AppError } from "../../lib/AppError.js";
import { MediaRole, PostStatus } from "../../generated/prisma/enums.js";

export const getPublishedPosts = async () => {
    const posts = await prisma.post.findMany(
        {
            where: {
                status: PostStatus.PUBLISHED,
            },
            include: {
                seriesEntry: {
                    include: {
                        series: true,
                    },
                },
                postTags: {
                    include: {
                        tag: true,
                    },
                },
            },
        });

        const normalizedPosts = posts.map((post) => {
            return {
                id: post.id,
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                publishedAt: post.publishedAt,

                series: post.seriesEntry
                    ? {
                        title: post.seriesEntry.series.title,
                        slug: post.seriesEntry.series.slug,
                    }
                    : null,

                tags: post.postTags.map((postTag) => {
                    return {
                        name: postTag.tag.name,
                        slug: postTag.tag.slug,
                    };
                }),
            }
        })

    return normalizedPosts;
};

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
        },
        include: {
            seriesEntry: {
                include: {
                    series: true,
                },
            },
            postTags: {
                include: {
                    tag: true,
                },
            },
            outgoingRelationships: {
                where: {
                    targetPost: {
                        status: PostStatus.PUBLISHED
                    },
                },
                include: {
                    targetPost: true,
                },
            },
            incomingRelationships: {
                where: {
                    sourcePost: {
                        status: PostStatus.PUBLISHED
                    },
                },
                include: {
                    sourcePost: true,
                },
            },
            media: {
                include: {
                    mediaAsset: true,
                },
            },
        }
    });

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    const coverMedia = post.media.find(
        (media) => media.role === MediaRole.COVER
    );

    const normalizedPost = {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        publishedAt: post.publishedAt,

        series: post.seriesEntry
            ? {
                title: post.seriesEntry.series.title,
                slug: post.seriesEntry.series.slug,
            }
            : null,

        tags: post.postTags.map((postTag) => {
            return {
                name: postTag.tag.name,
                slug: postTag.tag.slug,
            };
        }),

        coverImage: coverMedia
            ? {
                url: coverMedia.mediaAsset.url,
                altText: coverMedia.mediaAsset.altText,
            }
            : null,

            outgoingRelationships: post.outgoingRelationships.map((relationship) => {
                return {
                    relationshipType: relationship.relationshipType,
                    anchor: relationship.targetAnchor,
                    title: relationship.targetPost.title,
                    slug: relationship.targetPost.slug,
                }
            }),

            incomingRelationships: post.incomingRelationships.map((relationship) => {
                return {
                    relationshipType: relationship.relationshipType,
                    anchor: relationship.targetAnchor,
                    title: relationship.sourcePost.title,
                    slug: relationship.sourcePost.slug,
                }
            }),
    }

    return normalizedPost;
}

export const publishPost = async (slug: string) => {
    const post = await prisma.post.findUnique({
        where: {
            slug,
        }
    });

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    if (post.status === PostStatus.PUBLISHED) {
        throw new AppError("Post is already published", 409);
    }

    if (!post.body || post.body.trim().length === 0) {
        throw new AppError("Post body is required before publishing", 400);
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

export const archivePost = async (slug: string) => {
    const post  = await prisma.post.findUnique({
        where: {
            slug,
        }
    });

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    if (post.status === PostStatus.DRAFT) {
        throw new AppError("Post must be published first", 409);
    }

    if (post.status === PostStatus.ARCHIVED) {
        throw new AppError("Post already archived", 409);
    }

    const archivedPost = await prisma.post.update({
        where: {
            slug,
        },
        data: {
            status: PostStatus.ARCHIVED,
        }
    })

    return archivedPost;
}

export const updatePost = async (
    slug: string,
    input: UpdatePostInput
) => {
    const post = await prisma.post.findUnique({
        where: { slug },
    });

    if (!post) {
        throw new AppError("Post not found", 404);
    }

    if (post.status !== PostStatus.DRAFT) {
        throw new AppError("Post is not a draft", 409);
    }
    const updatedPost = await prisma.post.update({
        where: { 
            slug,
        },
        data: {
            ...(input.title !== undefined && { title: input.title}),
            ...(input.excerpt !== undefined && { excerpt: input.excerpt }),
            ...(input.body !== undefined && { body: input.body }),
        }
    })

    return updatedPost;
}

export const getAuthorPosts = async () => {
    const posts = await prisma.post.findMany();

    return posts;
}