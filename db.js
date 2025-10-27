import mongoose from "mongoose"

export async function connectDB() {
  if (mongoose.connections[0].readyState) return; // already connected

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
}
