import { Request, Response } from "express";
import Product from "../models/product.model";

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const { category, subCategory, search, featured } = req.query;
        let query: any = {};

        if (category) {
            query.category = category;
        }

        if (subCategory) {
            query.subCategory = subCategory;
        }

        if (featured) {
            query.isFeatured = featured === 'true';
        }

        if (search) {
            query.$text = { $search: search as string };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }
        res.status(200).json({ success: true, data: product });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }

        res.status(200).json({ success: true, data: product });
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            res.status(404).json({ success: false, message: "Product not found" });
            return;
        }

        await product.deleteOne();
        res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};
