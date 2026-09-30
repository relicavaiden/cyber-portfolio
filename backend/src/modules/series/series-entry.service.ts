import prisma from "../../lib/prisma.js";
import { AppError } from "../../lib/AppError.js";

import type { CreateSeriesEntryInput } from "./series-entry.schema.js";

export const createSeriesEntry = async (
    seriesSlug: string,
    input: CreateSeriesEntryInput
) => {
    const series = await prisma.series.findUnique({
        where: {
            slug: seriesSlug,
        },
    });

    if (!series) {
        throw new AppError("Series not found", 404)
    }

    const post = await prisma.post.findUnique({
        where: {
            slug: input.postSlug,
        },
    });

    if (!post) {
        throw new AppError("Post not found", 404)
    }

    const existingPostEntry = await prisma.seriesEntry.findUnique({
        where: {
            postId: post.id,
        },
    });

    if (existingPostEntry) {
        throw new AppError("Post already belongs to a series", 409)
    }

    const existingPosition = await prisma.seriesEntry.findFirst({
        where: {
            seriesId: series.id,
            position: input.position,
        },
    });

    if (existingPosition) {
        throw new AppError("Series position is already occupied", 409);
    }

    const seriesEntry = await prisma.seriesEntry.create({
        data: {
            seriesId: series.id,
            postId: post.id,
            position: input.position,
        },
    });

    return seriesEntry;
}