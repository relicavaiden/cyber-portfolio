import * as argon2 from "argon2";
import prisma from "../lib/prisma.js";
import "dotenv/config";

export const seedUser = async() => {
    const email = process.env.SEED_USER_EMAIL?.trim().toLowerCase();
    const password = process.env.SEED_USER_PASSWORD;
    try {
        if (!email || !password) {
            throw new Error("Seed user credentials are required");
        }

        const passwordHash = await argon2.hash(password);

        const user = await prisma.user.create({
            data: {
                email,
                passwordHash,
            },
        });

        console.log(`Seeded user: ${user.email}`);
    } catch (error) {
        console.error("Failed to seed user:", error);
    } finally {
        await prisma.$disconnect();
    }
};

seedUser();