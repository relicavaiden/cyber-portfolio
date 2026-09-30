import type { Request, Response } from "express";
import { createPostRelationship } from "./post-relationship.service.js";

export const createPostRelationshipController = async (
    req: Request<{ slug: string }>,
    res: Response
) => {
    const postRelationship = await createPostRelationship(
        req.params.slug,
        req.body
    );

    return res.status(201).json(postRelationship);
}