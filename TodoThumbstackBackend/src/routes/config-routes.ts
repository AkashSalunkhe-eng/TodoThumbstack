import { Router } from "express";
import { healthController } from "../controller/config-controller";

const router = Router();

router.get("/health", healthController);

export default router;