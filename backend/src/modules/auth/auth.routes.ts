import { Router } from "express";
import { loginSchema } from "./auth.schema.js";
import { loginController, logoutController } from "./auth.controller.js";
import { validateBody } from "../../middleware/validate.middleware.js";
import { requireAuth } from "../../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/login",
    validateBody(loginSchema),
    loginController
);

router.get(
    "/session",
    requireAuth,
    (_req, res) => {
        return res.status(200).json({
            status: "session login succeded",
        });
    }
);

router.post(
    "/logout",
    requireAuth,
    logoutController
);

export default router;