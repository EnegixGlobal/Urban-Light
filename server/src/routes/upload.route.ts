import express from "express";
import multer from "multer";
import path from "path";
import { protect } from "../middleware/auth.middleware";
import { authorized } from "../middleware/role.middleware";

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
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
    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ url });
});

export default router;
