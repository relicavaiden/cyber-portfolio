import type { Request, Response } from "express";
import { getPublishedPosts } from "./post.service.js";

export const getPublishedPostsController = async (
    _req: Request,
    res: Response
) => {
    const posts = await getPublishedPosts()

    return res.status(200).json(posts);
};