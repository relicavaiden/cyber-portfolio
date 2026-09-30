import prisma from "../../lib/prisma.js";
import { AppError } from "../../lib/AppError.js";
import { SeriesStatus } from "../../generated/prisma/enums.js";
import type { CreateSeriesInput } from "./series.schema.js";

export const createSeries = async (input: CreateSeriesInput) => {
    const slug = input.title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

        const existingSeries = await prisma.series.findUnique({
            where: { slug }
        })

        if (existingSeries) {
            throw new AppError("Series already exists.", 409)
        }

        const series = prisma.series.create({
            data: {
                title: input.title,
                slug,
                description: input.description ?? null,
            },
        });

        return series;
};

export const getActiveSeries = async () => {
    const series = await prisma.series.findMany(
        {
            where: {
                status: SeriesStatus.ACTIVE,
            }
        }
    )

    return series;
}

export const getSeriesBySlug = async (slug: string) => {
    const series = await prisma.series.findUnique({
        where: {
            slug,
        },
        include: {
            entries: {
                orderBy: {
                    position: "asc",
                },
                include: {
                    post: true,
                },
            },
        },
    });

    if (!series) {
        throw new AppError("Series not found", 404);
    }

    return series;
}

export const archivedSeries = async (slug: string) => {
    const series = await prisma.series.findUnique({
        where: {
            slug,
        }
    });

    if (!series) {
        throw new AppError("Series not found", 404);
    }

    if (series.status === SeriesStatus.ARCHIVED) {
        throw new AppError("Series already archived", 409)
    }

    const archivedSeries = await prisma.series.update({
        where: {
            slug,
        },
        data: {
            status: SeriesStatus.ARCHIVED,
        }
    })

    return archivedSeries;
}

export const completedSeries = async (slug: string) => {
    const series = await prisma.series.findUnique({
        where: {
            slug,
        }
    })

    if (!series) {
        throw new AppError("Series not found", 404);
    }

    if (series.status === SeriesStatus.COMPLETED) {
        throw new AppError("Series is already completed", 409);
    }

    if (series.status === SeriesStatus.ARCHIVED) {
        throw new AppError("Series needs to be active or completed first", 409)
    }

    const completedSeries = await prisma.series.update({
        where: {
            slug,
        },
        data: {
            status: SeriesStatus.COMPLETED
        }
    })

    return completedSeries
}