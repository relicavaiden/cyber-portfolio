import type { Request, Response } from "express";
import { createTagEntry } from "./post-tag.service.js";

export const createPostTagEntryController = async (
    req: Request<{ slug: string }>,
    res: Response
) => {
    const postTag = await createTagEntry(
        req.params.slug,
        req.body
    );

    return res.status(201).json(postTag);
};