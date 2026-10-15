import type { NextFunction, Request, Response } from "express";
import { loginUser } from "./auth.service.js";
import { AppError } from "../../lib/AppError.js";

export const loginController = async (
    req: Request,
    res: Response
) => {
    const user = await loginUser(req.body);

    req.session.userId = user.id;

    return res.status(200).json(user);
}

export const logoutController = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    req.session.destroy((error) => {
        if (error) {
            return next(
                new AppError("Failed to log out", 500)
            );
        }

        res.clearCookie("portfolio.sid");

            return res.status(200).json({
                message: "Logged out successfully"
            });
    });
};