import { Review } from "../models/reviewModel.js";
import { Movie } from "../models/movieModel.js";
import { User } from "../models/userModel.js";

// Add a Review
export const addReview = async (req, res, next) => {
    try {
        const { movieId, rating, review } = req.body;
        const userId = req.user.id;

        const movie = await Movie.findById(movieId);
        if (!movie) {
            return next(new Error("Movie not found"));
        }

        const newReview = new Review({
            userId,
            movieId,
            rating,
            review,
            createdAt: new Date(),
        });

        await newReview.save();

        // Update movie rating
        const reviews = await Review.find({ movieId });
        const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
        movie.averageRating = totalRating / reviews.length;
        movie.ratingCount = reviews.length;
        await movie.save();

        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        next(error);
    }
};

// Update a Review
export const updateReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { rating, review } = req.body;
        const userId = req.user.id;

        const existingReview = await Review.findOne({ _id: reviewId, userId });
        if (!existingReview) {
            return next(new Error("Review not found or unauthorized"));
        }

        existingReview.rating = rating || existingReview.rating;
        existingReview.review = review || existingReview.review;
        await existingReview.save();

        res.json({ message: "Review updated successfully", review: existingReview });
    } catch (error) {
        next(error);
    }
};

// Delete a Review
export const deleteReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findOne({ _id: reviewId, userId });
        if (!review) {
            return next(new Error("Review not found or unauthorized"));
        }

        await review.deleteOne();
        res.json({ message: "Review deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Get all reviews for a specific movie
export const getReviewsByMovie = async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const reviews = await Review.find({ movieId }).populate("userId", "name profile_pic");

        if (!reviews.length) {
            return res.status(404).json({ message: "No reviews found for this movie" });
        }

        res.json(reviews);
    } catch (error) {
        next(error);
    }
};

// Like a Review
export const likeReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findById(reviewId);
        if (!review) {
            return next(new Error("Review not found"));
        }

        if (!review.likes.includes(userId)) {
            review.likes.push(userId);
        }

        review.dislikes = review.dislikes.filter(id => id.toString() !== userId);

        await review.save();
        res.json({ message: "Review liked", review });
    } catch (error) {
        next(error);
    }
};

// Dislike a Review
export const dislikeReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const userId = req.user.id;

        const review = await Review.findById(reviewId);
        if (!review) {
            return next(new Error("Review not found"));
        }

        if (!review.dislikes.includes(userId)) {
            review.dislikes.push(userId);
        }

        review.likes = review.likes.filter(id => id.toString() !== userId);

        await review.save();
        res.json({ message: "Review disliked", review });
    } catch (error) {
        next(error);
    }
};

// Report a Review
export const reportReview = async (req, res, next) => {
    try {
        const { reviewId } = req.params;
        const { reason } = req.body;
        const userId = req.user.id;

        const review = await Review.findById(reviewId);
        if (!review) {
            return next(new Error("Review not found"));
        }

        review.reports.push({ userId, reason, reportedAt: new Date() });

        await review.save();
        res.json({ message: "Review reported", review });
    } catch (error) {
        next(error);
    }
};
