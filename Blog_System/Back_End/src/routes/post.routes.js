import express from "express";
import {
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", createPost);       // Create Post
router.get("/", getAllPosts);       // Get All Posts
router.get("/:id", getPost);        // Get One Post
router.put("/:id", updatePost);     // Update Post
router.delete("/:id", deletePost);  // Delete Post

export default router;
