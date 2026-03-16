import express from "express";
import { getAdminSummary, getAllCustomers } from "../controllers/admin.controller";
import { protect } from "../middleware/auth.middleware";
import { authorized } from "../middleware/role.middleware";

const router = express.Router();

router.get("/summary", protect, authorized("admin"), getAdminSummary);
router.get("/customers", protect, authorized("admin"), getAllCustomers);

export default router;
