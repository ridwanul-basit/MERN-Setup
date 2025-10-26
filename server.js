import express from "express";
import next from "next";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

// Middleware
server.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Use blogRoutes for /api/blogs
server.use("/api/blogs", blogRoutes);

// Handle frontend requests
app.prepare().then(() => {
  server.all("*", (req, res) => handle(req, res));
  server.listen(3000, () => console.log("Server running on http://localhost:3000"));
});
