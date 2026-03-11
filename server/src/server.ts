import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db";
import authRoutes from "./routes/auth.route";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();


app.use(express.json());


connectDb();


app.get("/", (req, res) => {
  res.send("Hello from TypeScript + Express + MongoDB!");
});

app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});