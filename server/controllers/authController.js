import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import { User } from "../models/userModel.js";

// Register User
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password before saving
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        next(error);
    }
};

// Login User
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({ message: "Login successful", user });
        } else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        next(error);
    }
};

// Logout User
export const logoutUser = async (req, res, next) => {
    try {
        res.json({ message: "User logged out successfully" });
    } catch (error) {
        next(error);
    }
};

// Forgot Password (Placeholder function)
export const forgotPassword = async (req, res, next) => {
    try {
        // Implement password reset logic (send email with reset link)
        res.json({ message: "Password reset link sent to your email" });
    } catch (error) {
        next(error);
    }
};

// Reset Password
export const resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password before saving
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        next(error);
    }
};
