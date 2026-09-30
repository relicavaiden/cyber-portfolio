import type { Request, Response } from "express";
import { archivedSeries, completedSeries, createSeries, getActiveSeries, getSeriesBySlug } from "./series.service.js";


export const createSeriesController = async (
    req: Request,
    res: Response
) => {
    const series = await createSeries(req.body);

    return res.status(201).json(series);
}

export const getActiveSeriesController = async (
    _req: Request,
    res: Response
) => {
    const series = await getActiveSeries()

    return res.status(200).json(series);
};

export const archivedSeriesController = async (
    req: Request<{ slug: string }>,
    res: Response
) => {
    const series = await archivedSeries(req.params.slug)

    return res.status(200).json(series);
}

export const completedSeriesController = async (
    req: Request<{ slug: string }>,
    res: Response
) => {
    const series = await completedSeries(req.params.slug);

    return res.status(200).json(series);
}

export const getSeriesBySlugController = async (
    req: Request<{ slug: string }>,
    res: Response
) => {
    const series = await getSeriesBySlug(req.params.slug);

    return res.status(200).json(series);
}