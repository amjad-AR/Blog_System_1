import express from "express";
import {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    loginUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);               // Create User
router.post("/login", loginUser);          // Login
router.get("/", getAllUsers);               // Get All Users
router.get("/:id", getUser);                // Get One User
router.put("/:id", updateUser);             // Update User
router.delete("/:id", deleteUser);          // Delete User

export default router;
