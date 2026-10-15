import { Router } from "express";
import { archivePostController, getPostBySlugController, getPublishedPostsController, publishPostController, updatePostController } from "./post.controller.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import { createPostSchema, updatePostSchema } from "./post.schema.js";
import { createPostController } from "./post.controller.js";
import { createPostRelationshipSchema } from "./post-relationship.schema.js";
import { createPostRelationshipController } from "./post-relationship.controller.js";
import { createPostTagEntrySchema } from "./post-tag.schema.js";
import { createPostTagEntryController } from "./post-tag.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.get("/", getPublishedPostsController)
router.post(
    "/",
    requireAuth,
    validateBody(createPostSchema),
    createPostController
);

router.get("/:slug",getPostBySlugController);
router.patch("/:slug/publish",requireAuth, publishPostController);
router.patch("/:slug/archive",requireAuth, archivePostController);

router.post(
    "/:slug/relationships",
    requireAuth,
    validateBody(createPostRelationshipSchema),
    createPostRelationshipController
)

router.patch(
    "/:slug",
    requireAuth,
    validateBody(updatePostSchema),
    updatePostController
);

router.post(
    "/:slug/tags",
    requireAuth,
    validateBody(createPostTagEntrySchema),
    createPostTagEntryController
);

export default router;