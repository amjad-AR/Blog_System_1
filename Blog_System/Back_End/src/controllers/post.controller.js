import { Post } from "../models/post.model.js";

// CREATE POST
export const createPost = async (req, res) => {
    try {
        const { userId, title, content } = req.body;

        // validation
        if (!userId || !title || !content) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // create post
        const post = await Post.create({
            userId,
            title,
            content,
        });

        return res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// GET ALL POSTS
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("userId", "name email");

        return res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// GET SINGLE POST
export const getPost = async (req, res) => {
    try {
        const id = req.params.id;

        const post = await Post.findById(id).populate("userId", "name email");

        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }

        return res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// UDPATE POST
export const updatePost = async (req, res) => {
    try {
        const id = req.params.id;

        const updated = await Post.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updated) {
            return res.status(404).json({ message: "Post not found." });
        }

        return res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// DELETE POST
export const deletePost = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await Post.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Post not found." });
        }

        return res
            .status(200)
            .json({ message: "Post deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
