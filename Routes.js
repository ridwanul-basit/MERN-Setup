import express from "express";
import BlogModel from "../lib/models/BlogModel.js";

const router = express.Router();

// 🟢 GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.find().sort({ date: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// 🟢 POST a new blog
router.post("/", async (req, res) => {
  try {
    const newBlog = await BlogModel.create(req.body);
    res.json({ success: true, blog: newBlog });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});
 
// 🟢 GET single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, msg: "Blog not found" });
    res.json({ success: true, blog });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// 🟠 UPDATE a blog by ID
router.put("/:id", async (req, res) => {
  try {
    const { title, description, category, author, authorImg, image } = req.body;

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      req.params.id,
      { title, description, category, author, authorImg, image },
      { new: true, runValidators: true } // returns updated doc & applies schema validation
    );

    if (!updatedBlog)
      return res.status(404).json({ success: false, msg: "Blog not found" });

    res.json({ success: true, msg: "Blog updated", blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

// 🔴 DELETE a blog
router.delete("/:id", async (req, res) => {
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, msg: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ success: false, msg: error.message });
  }
});

export default router;
