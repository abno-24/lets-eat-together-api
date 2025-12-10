import { Router } from "express";
import healthRoute from "./health.route.js";
import dishRoute from "./dish.route.js";

const router = Router();

router.use("/health", healthRoute);
router.use("/search", dishRoute);

export default router;
