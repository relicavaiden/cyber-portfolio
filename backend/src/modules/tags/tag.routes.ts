import { Router } from "express";
import { validateBody } from "../../middleware/validate.middleware.js";
import { createTagSchema } from "./tag.schema.js";
import { createTagController } from "./tag.controller.js";

const router = Router()

router.post(
    "/",
    validateBody(createTagSchema),
    createTagController
)

export default router;