import "dotenv/config"

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
}

export { DATABASE_URL };

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    throw new Error("SESSION_SECRET is required");
}

const SESSION_SECRET: string = sessionSecret;

export { SESSION_SECRET };