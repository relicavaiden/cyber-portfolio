import { AppError } from "../../lib/AppError.js";
import prisma from "../../lib/prisma.js";
import type { LoginInput } from "./auth.schema.js";
import * as argon2 from "argon2";

export const loginUser = async (
    input: LoginInput
) => {
    const user = await prisma.user.findUnique({
        where: {
            email: input.email,
        },
    });

    if (!user) {
        throw new AppError("Invalid email or password", 401);
    }

    const passwordMatches = await argon2.verify(
        user.passwordHash,
        input.password
    );

    if (!passwordMatches) {
        throw new AppError("Invalid email or password", 401);
    }

    return {
        id: user.id,
        email: user.email,
    };
}