import express from "express";
import next from "next";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import { connectDB } from "./lib/config/db.js";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();

server.use(express.json());

// ✅ Connect MongoDB once
connectDB();

// Routes
server.use("/api/blogs", blogRoutes);

// Next.js frontend
app.prepare().then(() => {
  server.all("*", (req, res) => handle(req, res));
  server.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
});
