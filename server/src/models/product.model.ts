import mongoose, { Schema, Document } from "mongoose";

export interface IReview {
    user: mongoose.Types.ObjectId;
    name: string;
    rating: number;
    comment: string;
    createdAt: Date;
}

export interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    category: string;
    subCategory?: string;
    images: string[];
    stock: number;
    isFeatured: boolean;
    specifications: {
        material?: string;
        dimensions?: string;
        wattage?: string;
        color?: string;
        finish?: string;
        [key: string]: string | undefined;
    };
    ratings: {
        average: number;
        count: number;
    };
    reviews: IReview[];
}

const ProductSchema = new Schema<IProduct>({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Product description is required"]
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Price cannot be negative"]
    },
    oldPrice: {
        type: Number,
        min: [0, "Old price cannot be negative"]
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
        enum: {
            values: [
                "Chandeliers",
                "Wall Lights",
                "Pendants",
                "Duplex",
                "Outdoor",
                "Fans",
                "Lamps",
                "Architecter Lights",
                "Artifacts"
            ],
            message: "{VALUE} is not a valid category"
        }
    },
    subCategory: {
        type: String,
        trim: true
    },
    images: {
        type: [String],
        required: [true, "At least one product image is required"]
    },
    stock: {
        type: Number,
        default: 0,
        min: [0, "Stock cannot be negative"]
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    specifications: {
        material: String,
        dimensions: String,
        wattage: String,
        color: String,
        finish: String
    },
    ratings: {
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: String,
            rating: {
                type: Number,
                required: true,
                min: 1,
                max: 5
            },
            comment: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

// Create index for search
ProductSchema.index({ name: 'text', description: 'text', category: 'text' });

const Product = mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
