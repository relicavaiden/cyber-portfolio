import type { Request, Response } from "express";
import { createSeriesEntry } from "./series-entry.service.js";

export const createSeriesEntryController = async (
    req: Request<{ slug: string }>,
    res: Response
) => {
    const seriesEntry = await createSeriesEntry(
        req.params.slug,
        req.body
    );

    return res.status(201).json(seriesEntry);
};