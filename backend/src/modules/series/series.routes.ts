import { Router } from "express";

import { validateBody } from "../../middleware/validate.middleware.js";
import { createSeriesSchema } from "./series.schema.js";
import { archivedSeriesController, completedSeriesController, createSeriesController, getActiveSeriesController, getSeriesBySlugController } from "./series.controller.js";
import { createSeriesEntrySchema } from "./series-entry.schema.js";
import { createSeriesEntryController } from "./series-entry.controller.js";

const router = Router()

router.post(
    "/",
    validateBody(createSeriesSchema),
    createSeriesController
);

router.get("/", getActiveSeriesController);
router.get("/:slug", getSeriesBySlugController);
router.patch("/:slug/archive", archivedSeriesController);
router.patch("/:slug/complete", completedSeriesController);

router.post(
    "/:slug/posts",
    validateBody(createSeriesEntrySchema),
    createSeriesEntryController
)

export default router;