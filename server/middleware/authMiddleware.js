import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { Admin } from "../models/adminModel.js";


// Middleware to protect routes (Only authenticated users can access)
export const protect = async (req, res, next) => {
    let token = req.headers.authorization?.startsWith("Bearer") 
        ? req.headers.authorization.split(" ")[1] 
        : null;

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next();
    } catch (error) {
        console.error("JWT Error:", error);
        res.status(401).json({ message: "Not authorized, token failed" });
    }
};

// Middleware to check admin access for a user
export const admin = (req, res, next) => {
    if (req.user?.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as admin" });
    }
};

// Middleware to protect admin routes (Only authenticated admins can access)
export const adminProtect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];

        if (!process.env.JWT_SECRET_KEY) {
            return res.status(500).json({ message: "JWT Secret Key is missing" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.admin = await Admin.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error("JWT Error:", error.message);
            res.status(401).json({ message: "Token is invalid" });
        }
    } else {
        res.status(401).json({ message: "No token provided, authorization denied" });
    }
};


// Middleware to restrict access to admin-only routes
export const adminOnly = (req, res, next) => {
    if (req.user?.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Not authorized as admin" });
    }
};
