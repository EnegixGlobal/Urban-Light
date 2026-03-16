import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Order from "../models/order.model";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req: AuthRequest, res: Response) => {
    try {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = req.body;

        if (orderItems && orderItems.length === 0) {
            return res.status(400).json({ message: "No order items" });
        }

        const order = new Order({
            user: req.user.id, // Assuming decoded token has id
            items: orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req: AuthRequest, res: Response) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (order) {
            // Check if it's the owner or admin
            if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
                return res.status(401).json({ message: "Not authorized" });
            }
            res.json(order);
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req: AuthRequest, res: Response) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.json(orders);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
