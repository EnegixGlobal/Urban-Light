import { Response } from "express";
import Wishlist from "../models/wishlist.model";
import { AuthRequest } from "../middleware/auth.middleware";

// Get user wishlist
export const getWishlist = async (req: AuthRequest, res: Response) => {
    try {
        let wishlist = await Wishlist.findOne({ userId: req.user.id }).populate("products");

        if (!wishlist) {
            wishlist = await Wishlist.create({ userId: req.user.id, products: [] });
        }

        res.json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Toggle wishlist (Add if not exists, remove if exists)
export const toggleWishlist = async (req: AuthRequest, res: Response) => {
    try {
        const { productId } = req.body;
        let wishlist = await Wishlist.findOne({ userId: req.user.id });

        if (!wishlist) {
            wishlist = new Wishlist({ userId: req.user.id, products: [] });
        }

        const index = wishlist.products.indexOf(productId);

        if (index > -1) {
            // Remove
            wishlist.products.splice(index, 1);
            await wishlist.save();
            const updatedWishlist = await Wishlist.findById(wishlist._id).populate("products");
            return res.json({ message: "Removed from wishlist", wishlist: updatedWishlist });
        } else {
            // Add
            wishlist.products.push(productId);
            await wishlist.save();
            const updatedWishlist = await Wishlist.findById(wishlist._id).populate("products");
            return res.json({ message: "Added to wishlist", wishlist: updatedWishlist });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Remove from wishlist
export const removeFromWishlist = async (req: AuthRequest, res: Response) => {
    try {
        const { productId } = req.params;
        let wishlist = await Wishlist.findOne({ userId: req.user.id });

        if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });

        wishlist.products = wishlist.products.filter(
            (id) => id.toString() !== productId
        );

        await wishlist.save();
        const updatedWishlist = await Wishlist.findById(wishlist._id).populate("products");
        res.json(updatedWishlist);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
