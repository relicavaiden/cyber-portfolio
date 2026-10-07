import prisma from "../../lib/prisma.js";
import { AppError } from "../../lib/AppError.js";

import type { CreateTagInput } from "./tag.schema.js";

export const createTag = async (input: CreateTagInput) => {
    const slug = input.name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");

        const existingTag = await prisma.tag.findUnique({
            where: { slug }
        })

        if (existingTag) {
            throw new AppError("Tag already exists", 409);
        }

        const tag = await prisma.tag.create({
            data: {
                name: input.name,
                slug,
            },
        });

        return tag;
}