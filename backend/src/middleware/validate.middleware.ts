import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";

export const validateBody = (schema: z.ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                error: "Invalid request",
                details: result.error.issues,
            });
        }

        req.body = result.data;
        return next();
    };
};