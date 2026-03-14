import express from "express";
import { getAdminSummary } from "../controllers/admin.controller";
import { protect } from "../middleware/auth.middleware";
import { authorized } from "../middleware/role.middleware";

const router = express.Router();

router.get("/summary", protect, authorized("admin"), getAdminSummary);

export default router;
