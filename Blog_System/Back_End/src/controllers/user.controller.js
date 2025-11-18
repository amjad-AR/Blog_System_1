// src/controllers/user.controller.js
import { User } from "../models/user.model.js";

// Create new user
export const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1) validation basic
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // 2) check if user already exists
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(409).json({ message: "Email already registered." });
        }

        // 3) create user
        const user = await User.create({
            name,
            email,
            password,
        });

        return res.status(201).json({ message: "added successfully", user: user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// GET ALL USRES
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// GET SINGLE USER
export const getUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// UPDATE USER DATA
export const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const updated = await User.findByIdAndUpdate(userId, req.body, {
            new: true,
        });

        if (!updated) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// DELET USER
export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;

        const deleted = await User.findByIdAndDelete(userId);

        if (!deleted) {
            return res.status(404).json({ message: "User not found." });
        }

        return res.status(200).json({ message: "User deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// LOGIN USER
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // NOTE: Passwords are stored plaintext in this simple example.
        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
