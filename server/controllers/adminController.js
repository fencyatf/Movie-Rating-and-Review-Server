import { Admin } from "../models/adminModel.js";
import { User } from "../models/userModel.js";
import { Movie } from "../models/movieModel.js";
import { Review } from "../models/reviewModel.js";
import { Report } from "../models/reportModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";


// Admin Login
export const adminLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for:", email);

        const admin = await Admin.findOne({ email });

        if (!admin) {
            console.log("Admin not found!");
            return next(new Error("Invalid email or password"));
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return next(new Error("Invalid email or password"));
        }

        const token = generateToken(admin._id, "admin");
        res.status(200).json({ token, adminId: admin._id, message: "Login successful" });
    } catch (error) {
        next(error);
    }
};

// Admin Logout
export const adminLogout = async (req, res, next) => {
    try {
        res.status(200).json({ message: "Admin logged out successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// Ban a User
export const banUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new Error("User not found"));
        }

        user.isBanned = true;
        await user.save();
        res.json({ message: "User has been banned" });
    } catch (error) {
        next(error);
    }
};

// Unban a User
export const unbanUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new Error("User not found"));
        }

        user.isBanned = false;
        await user.save();
        res.json({ message: "User has been unbanned" });
    } catch (error) {
        next(error);
    }
};

// Delete a User
export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new Error("User not found"));
        }

        await user.deleteOne();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all reports
export const getReports = async (req, res, next) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (error) {
        next(error);
    }
};

// Resolve a Report
export const resolveReport = async (req, res, next) => {
    try {
        const report = await Report.findById(req.params.id);
        if (!report) {
            return next(new Error("Report not found"));
        }

        report.status = "resolved";
        await report.save();
        res.json({ message: "Report has been resolved" });
    } catch (error) {
        next(error);
    }
};

// Get all movies
export const getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        next(error);
    }
};

// Add a Movie
export const addMovie = async (req, res, next) => {
    try {
        const { title, genre, director, releaseYear } = req.body;
        const newMovie = new Movie({ title, genre, director, releaseYear });

        await newMovie.save();
        res.json({ message: "Movie added successfully", movie: newMovie });
    } catch (error) {
        next(error);
    }
};

// Delete a Movie
export const deleteMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return next(new Error("Movie not found"));
        }

        await movie.deleteOne();
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all reviews
export const getAllReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (error) {
        next(error);
    }
};

// Delete a Review
export const deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return next(new Error("Review not found"));
        }

        await review.deleteOne();
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        next(error);
    }
};
