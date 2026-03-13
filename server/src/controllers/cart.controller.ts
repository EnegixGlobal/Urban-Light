import { Response } from "express";
import Cart from "../models/cart.model";
import { AuthRequest } from "../middleware/auth.middleware";

// Get user cart
export const getCart = async (req: AuthRequest, res: Response) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");

        if (!cart) {
            cart = await Cart.create({ userId: req.user.id, items: [] });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Add item to cart
export const addToCart = async (req: AuthRequest, res: Response) => {
    try {
        const { productId, quantity = 1 } = req.body;
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        const updatedCart = await Cart.findById(cart._id).populate("items.productId");
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Remove item from cart (decrease quantity)
export const removeFromCart = async (req: AuthRequest, res: Response) => {
    try {
        const { productId } = req.body;
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex > -1) {
            if (cart.items[itemIndex].quantity > 1) {
                cart.items[itemIndex].quantity -= 1;
            } else {
                cart.items.splice(itemIndex, 1);
            }
            await cart.save();
        }

        const updatedCart = await Cart.findById(cart._id).populate("items.productId");
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete item completely from cart
export const deleteFromCart = async (req: AuthRequest, res: Response) => {
    try {
        const { productId } = req.params;
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(
            (item) => item.productId.toString() !== productId
        );

        await cart.save();
        const updatedCart = await Cart.findById(cart._id).populate("items.productId");
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Clear cart
export const clearCart = async (req: AuthRequest, res: Response) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.json({ message: "Cart cleared", items: [] });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
