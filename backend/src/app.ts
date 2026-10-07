import express from "express"
import postRoutes from "./modules/posts/post.routes.js"
import { errorHandler } from "./middleware/error.middleware.js"
import seriesRoutes from "./modules/series/series.routes.js"
import tagRoutes from "./modules/tags/tag.routes.js"

const app = express()
app.use(express.json())
app.get("/api/health", (req, res) => {
    res.status(200).json({ 
        status: "ok", 
        service: "blog-backend"
    })
})
app.use("/api/posts", postRoutes)
app.use("/api/series", seriesRoutes);
app.use("/api/tags", tagRoutes);
app.use(errorHandler);

export default app;