import { Router } from "express";

import { validateBody } from "../../middleware/validate.middleware.js";
import { createSeriesSchema } from "./series.schema.js";
import { archivedSeriesController, completedSeriesController, createSeriesController, getActiveSeriesController, getSeriesBySlugController } from "./series.controller.js";
import { createSeriesEntrySchema } from "./series-entry.schema.js";
import { createSeriesEntryController } from "./series-entry.controller.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = Router()

router.post(
    "/",
    requireAuth,
    validateBody(createSeriesSchema),
    createSeriesController
);

router.get("/", getActiveSeriesController);
router.get("/:slug", getSeriesBySlugController);
router.patch("/:slug/archive", requireAuth, archivedSeriesController);
router.patch("/:slug/complete", requireAuth, completedSeriesController);

router.post(
    "/:slug/posts",
    requireAuth,
    validateBody(createSeriesEntrySchema),
    createSeriesEntryController
)

export default router;