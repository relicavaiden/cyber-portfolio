import type { Request, Response } from "express";
import { createTag } from "./tag.service.js";

export const createTagController = async (
    req: Request,
    res: Response
) => {
    const tag = await createTag(req.body);

    return res.status(201).json(tag)
}