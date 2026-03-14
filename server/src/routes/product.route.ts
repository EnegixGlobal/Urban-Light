import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/product.controller";
import { protect } from "../middleware/auth.middleware";
import { authorized } from "../middleware/role.middleware";

const router = express.Router();

router.route("/")
    .get(getProducts)
    .post(protect, authorized("admin"), createProduct);

router.route("/:id")
    .get(getProductById)
    .put(protect, authorized("admin"), updateProduct)
    .delete(protect, authorized("admin"), deleteProduct);

export default router;
