import { Router } from "express";
import { validateBody } from "../../middleware/validate.middleware.js";
import { createTagSchema } from "./tag.schema.js";
import { createTagController, updateTagController } from "./tag.controller.js";

const router = Router()

router.post(
    "/",
    validateBody(createTagSchema),
    createTagController
)

router.patch(
    "/:slug",
    validateBody(createTagSchema),
    updateTagController
);

export default router;