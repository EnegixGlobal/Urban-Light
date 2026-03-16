import { Request, Response } from "express";
import Product from "../models/product.model";
import User from "../models/user.model";

// @desc    Get dashboard summary statistics
// @route   GET /api/admin/summary
// @access  Private/Admin
export const getAdminSummary = async (req: Request, res: Response): Promise<void> => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalUsers = await User.countDocuments();

        // Get total out of stock products
        const outOfStockProducts = await Product.countDocuments({ stock: { $lte: 0 } });

        // Get latest reviews across all products
        const productsWithReviews = await Product.find({ "reviews.0": { $exists: true } })
            .select("name reviews")
            .lean();

        let allReviews: any[] = [];
        productsWithReviews.forEach(product => {
            product.reviews.forEach(review => {
                allReviews.push({
                    ...review,
                    productName: product.name,
                    productId: product._id
                });
            });
        });

        // Sort by date descending and get top 5
        allReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        const latestReviews = allReviews.slice(0, 5);

        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                totalUsers,
                outOfStockProducts,
                totalRevenue: 0,
                totalOrders: 0,
                latestReviews,
                conversionRate: "0%",
                revenueChange: "0%",
                ordersChange: "0%",
                usersChange: "0%"
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all users (customers)
// @route   GET /api/admin/customers
// @access  Private/Admin
export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
