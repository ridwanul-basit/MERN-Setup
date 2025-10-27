import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  author: String,
  authorImg: String,
  image: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
