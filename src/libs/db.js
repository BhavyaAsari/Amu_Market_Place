import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
// console.log("ENV CHECK:", process.env.MONGODB_URI);

// console.log("Mongo url",MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI not defined in environment variables");
}

export async function connectDB() {
  try {
    // If already connected, return
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully");
    
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}


