import mongoose from "mongoose";


const connectDb = async () => {
  try {
    const url:string | undefined = process.env.MONGO_URI;

    if (!url) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }
    mongoose.connect(url);
    console.log("Database Connacted");
  } catch (error:any) {
    console.error("Database not connacted:", error.message);
    process.exit(1);
  }
};

export default connectDb;
