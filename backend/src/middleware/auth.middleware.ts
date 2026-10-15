import type { Request, Response, NextFunction } from "express";
import { AppError } from "../lib/AppError.js";

export const requireAuth = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    if (!req.session.userId) {
        throw new AppError("Authentication required", 401);
    }

    return next();
}