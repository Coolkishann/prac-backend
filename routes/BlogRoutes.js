const express = require("express");
const router = express.Router();
const Blog = require("../model/Blog.js");

// Create a new blog
router.post("/blogs", async (req, res) => {
  try {
    const { subject, blogHead, blogData } = req.body;
    const newBlog = new Blog({ subject, blogHead, blogData });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Get all blogs or blogs by subject
router.get("/blogs/:subject?", async (req, res) => {
  try {
    const subject = req.params.subject;
    const query = subject ? { subject } : {};
    const blogs = await Blog.find(query);
    res.status(200).json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Delete a blog by ID
router.delete("/blogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const deletedBlog = await Blog.findByIdAndDelete(blogId);
    res.status(200).json("Deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Update a specific blog by ID
router.put("/blogs/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const updatedBlogData = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updatedBlogData, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
