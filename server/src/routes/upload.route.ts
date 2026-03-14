import express from "express";
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { protect } from "../middleware/auth.middleware";
import { authorized } from "../middleware/role.middleware";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary Storage Config
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "urban_product", // Folder in Cloudinary
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        // Resize image to max 1200x1200px while maintaining aspect ratio, and auto-compress quality/format
        transformation: [{ width: 1200, height: 1200, crop: "limit", quality: "auto", fetch_format: "auto" }],
    } as any, // using 'as any' to avoid TS errors for params typing depending on installed @types
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpe?g|png|webp/;
        const mimetypes = /image\/jpe?g|image\/png|image\/webp|image\/jpg/;

        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = mimetypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error("Images only! (jpeg, jpg, png, webp)"));
        }
    },
});

// Single image upload
router.post("/", protect, authorized("admin"), upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    // Cloudinary automatically returns the URL in req.file.path
    const url = req.file.path;
    res.json({ url });
});

export default router;
