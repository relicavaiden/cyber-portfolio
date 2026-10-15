import express from "express"
import postRoutes from "./modules/posts/post.routes.js"
import { errorHandler } from "./middleware/error.middleware.js"
import seriesRoutes from "./modules/series/series.routes.js"
import tagRoutes from "./modules/tags/tag.routes.js"
import authRoutes from "./modules/auth/auth.routes.js"
import session from "express-session"
import connectPgSimple from "connect-pg-simple"

import { DATABASE_URL, SESSION_SECRET } from "./config/env.js"

const PgSession = connectPgSimple(session);

const app = express()
app.use(express.json())

app.use(
    session({
        name: "portfolio.sid",

        store: new PgSession({
            conString: DATABASE_URL,
            createTableIfMissing: true,
        }),

        secret: SESSION_SECRET,

        resave: false,
        saveUninitialized: false,

        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 3 * 24 * 60 * 60 * 1000,
        },
    })
);
app.get("/api/health", (req, res) => {
    res.status(200).json({ 
        status: "ok", 
        service: "blog-backend"
    })
})
app.use("/api/auth", authRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/series", seriesRoutes);
app.use("/api/tags", tagRoutes);
app.use(errorHandler);

export default app;