import { Router } from "express";
import { getPublishedPostsController } from "./post.controller.js";

const router = Router();

router.get("/", getPublishedPostsController)

export default router;