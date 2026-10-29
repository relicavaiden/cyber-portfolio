import { Router } from "express";
import { requireAuth } from "../../middleware/auth.middleware.js";
import { uploadImage } from "../../middleware/media.middleware.js";
import { mediaUploadController } from "./media.controller.js";

const router = Router();

router.post(
    "/",
    requireAuth,
    uploadImage.single("file"),
    mediaUploadController
);

export default router;