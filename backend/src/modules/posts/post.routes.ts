import { Router } from "express";
import { archivePostController, getPostBySlugController, getPublishedPostsController, publishPostController } from "./post.controller.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import { createPostSchema } from "./post.schema.js";
import { createPostController } from "./post.controller.js";
import { createPostRelationshipSchema } from "./post-relationship.schema.js";
import { createPostRelationshipController } from "./post-relationship.controller.js";

const router = Router();

router.get("/", getPublishedPostsController)
router.post(
    "/",
    validateBody(createPostSchema),
    createPostController
);

router.get("/:slug",getPostBySlugController);
router.patch("/:slug/publish", publishPostController);
router.patch("/:slug/archive", archivePostController);

router.post(
    "/:slug/relationships",
    validateBody(createPostRelationshipSchema),
    createPostRelationshipController
)

export default router;