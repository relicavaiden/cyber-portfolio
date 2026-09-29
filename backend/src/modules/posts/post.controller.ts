import type { Request, Response } from "express";
import { archivePost, getPostBySlug, getPublishedPosts, publishPost } from "./post.service.js";
import { createPost } from "./post.service.js";

export const getPublishedPostsController = async (
    _req: Request,
    res: Response
) => {
    const posts = await getPublishedPosts()

    return res.status(200).json(posts);
};

export const createPostController = async (
    req: Request,
    res: Response
) => {
    const post = await createPost(req.body);

    return res.status(201).json(post);
}

export const getPostBySlugController = async (
    req: Request<{ slug: string }>,
    res: Response
) => {
    const post = await getPostBySlug(req.params.slug);

    return res.status(200).json(post);
}

export const publishPostController = async (
    req: Request<{ slug: string }>,
    res: Response
) => {
    const post = await publishPost(req.params.slug)

    return res.status(200).json(post);
}

export const archivePostController = async (
    req: Request<{ slug: string }>,
    res: Response
) => {
    const post = await archivePost(req.params.slug);

    return res.status(200).json(post);
}