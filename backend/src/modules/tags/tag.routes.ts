import { Router } from "express";
import { validateBody } from "../../middleware/validate.middleware.js";
import { createTagSchema } from "./tag.schema.js";
import { createTagController, updateTagController } from "./tag.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = Router()

router.post(
    "/",
    requireAuth,
    validateBody(createTagSchema),
    createTagController
)

router.patch(
    "/:slug",
    requireAuth,
    validateBody(createTagSchema),
    updateTagController
);

export default router;