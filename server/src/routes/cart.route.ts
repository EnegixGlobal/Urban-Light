import express from "express";
import {
    getCart,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart
} from "../controllers/cart.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.use(protect); // All cart routes need authentication

router.get("/", getCart);
router.post("/add", addToCart);
router.post("/remove", removeFromCart);
router.delete("/item/:productId", deleteFromCart);
router.delete("/clear", clearCart);

export default router;
