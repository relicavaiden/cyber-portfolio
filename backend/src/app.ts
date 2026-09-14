import express from "express"
import postRoutes from "./modules/posts/post.routes.js"

const app = express()
app.use(express.json())
app.get("/api/health", (req, res) => {
    res.status(200).json({ 
        status: "ok", 
        service: "blog-backend"
    })
})
app.use("/api/posts", postRoutes)

export default app;