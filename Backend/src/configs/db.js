import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export const mongoDbConnect = async () => {
  try {
    console.log(MONGO_URL);
    
    await mongoose.connect(MONGO_URL);
    console.log("MONGO DB connected...");    
  } catch (error) {
    console.log("Mongo DB connection failed", error);
  }
};
