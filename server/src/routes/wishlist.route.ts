import express from "express";
import {
    getWishlist,
    toggleWishlist,
    removeFromWishlist
} from "../controllers/wishlist.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.use(protect); // All wishlist routes need authentication

router.get("/", getWishlist);
router.post("/toggle", toggleWishlist);
router.delete("/:productId", removeFromWishlist);

export default router;
