import type { Request, Response } from "express";
import { createTag, updateTag } from "./tag.service.js";

export const createTagController = async (
    req: Request,
    res: Response
) => {
    const tag = await createTag(req.body);

    return res.status(201).json(tag)
}

export const updateTagController = async (
    req: Request<{ slug: string }>,
    res: Response
) => {
    const tag = await updateTag(
        req.params.slug,
        req.body
    );

    return res.status(200).json(tag);
}