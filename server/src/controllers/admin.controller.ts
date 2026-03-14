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

        // Mocking revenue and orders for now as we don't have separate models yet
        // In a real app, you'd aggregate these from an Order model
        const totalRevenue = 428450;
        const totalOrders = 156;

        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                totalUsers,
                totalRevenue,
                totalOrders,
                conversionRate: "3.24%",
                revenueChange: "+12.5%",
                ordersChange: "+8.2%",
                usersChange: "+5.1%"
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
