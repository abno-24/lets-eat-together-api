import { Router } from "express";
import { checkRouterHealth } from "../../controllers/checkRouterHealth.controller.js";

const router = Router();

router.route("/").get(checkRouterHealth);

export default router;