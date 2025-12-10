import { Router } from "express";
import { searchDishes } from "../controllers/dish.controller.js";

const router = Router();

router.route("/dishes").get(searchDishes);

export default router;
