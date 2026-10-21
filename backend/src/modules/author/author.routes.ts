import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { getAuthorPostsController } from "../posts/post.controller.js";

const router = Router();

router.get(
    "/posts",
    requireAuth,
    getAuthorPostsController
)

export default router;