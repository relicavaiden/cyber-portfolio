import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../lib/AppError.js";

export const errorHandler = (
    err: unknown,
    _req: Request,
    res: Response,
    _next: NextFunction,
) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message,
        });
    }
    
    if (err instanceof Error) {
        console.error(err.message);
    } else {
        console.log(err)
    }

    return res.status(500).json({
        "error": "Internal server error"
    })
}