import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./config/db";
import authRoutes from "./routes/auth.route";
import productRoutes from "./routes/product.route";
import adminRoutes from "./routes/admin.route";
import cartRoutes from "./routes/cart.route";
import wishlistRoutes from "./routes/wishlist.route";
import uploadRoutes from "./routes/upload.route";
import path from "path";

const PORT = process.env.PORT || 8000;

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:4173"],
  credentials: true
}));

// Local static files serving removed (now using Cloudinary for images)
connectDb();


app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/upload", uploadRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});