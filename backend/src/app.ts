import express from "express"
import postRoutes from "./modules/posts/post.routes.js"
import { errorHandler } from "./middleware/error.middleware.js"

const app = express()
app.use(express.json())
app.get("/api/health", (req, res) => {
    res.status(200).json({ 
        status: "ok", 
        service: "blog-backend"
    })
})
app.use("/api/posts", postRoutes)
app.use(errorHandler);

export default app;