import express from "express";
import {
    createComment,
    getAllComments,
    getComment,
    updateComment,
    deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/", createComment);       // Create Comment
router.get("/", getAllComments);       // Get All Comments
router.get("/:id", getComment);        // Get One Comment
router.put("/:id", updateComment);     // Update Comment
router.delete("/:id", deleteComment);  // Delete Comment

export default router;
