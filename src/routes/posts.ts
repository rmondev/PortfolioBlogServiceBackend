import express, { Request, Response, Router } from "express";
import Post from "../models/post";

const router: Router = express.Router();

// ✅ Get all posts
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Get a single post by ID
router.get("/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Create a new post
router.post(
  "/",
  async (
    req: Request<{}, {}, { title: string; body: string; category: string; date: string }>,
    res: Response
  ): Promise<void> => {
    try {
      const { title, body, category, date } = req.body;
      const newPost = await Post.create({ title, body, category, date });
      res.status(201).json(newPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }
);

// ✅ Delete a post
router.delete("/:id", async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
