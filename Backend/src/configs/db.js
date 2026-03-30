import mongoose from "mongoose";

export const mongoDbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGO DB connected...");    
  } catch (error) {
    console.log("Mongo DB connection failed", error);
  }
};
