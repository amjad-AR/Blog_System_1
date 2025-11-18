import { Comment } from "../models/comment.model.js";

// CREATE COMMENT
export const createComment = async (req, res) => {
    try {
        const { postId, userId, content } = req.body;

        if (!postId || !userId || !content) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const comment = await Comment.create({
            postId,
            userId,
            content,
        });

        return res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// GET ALL COMMENT
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate("postId", "title")
            .populate("userId", "name email");

        return res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// GET SINGLE COMMENT
export const getComment = async (req, res) => {
    try {
        const id = req.params.id;

        const comment = await Comment.findById(id)
            .populate("postId", "title")
            .populate("userId", "name email");

        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }

        return res.status(200).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// UPDATE COMMENT
export const updateComment = async (req, res) => {
    try {
        const id = req.params.id;

        const updated = await Comment.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!updated) {
            return res.status(404).json({ message: "Comment not found." });
        }

        return res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// DELETE COMMENT
export const deleteComment = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await Comment.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Comment not found." });
        }

        return res.status(200).json({ message: "Comment deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
