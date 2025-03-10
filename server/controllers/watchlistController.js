import { Watchlist } from "../models/watchlistModel.js";

// ✅ Add a movie to the watchlist
export const addToWatchlist = async (req, res, next) => {
    try {
        const { movieId } = req.body;
        const userId = req.user.id;

        // Check if the movie is already in the watchlist
        let watchlistItem = await Watchlist.findOne({ userId, movieId });

        if (watchlistItem) {
            return res.status(400).json({ message: "Movie is already in the watchlist" });
        }

        watchlistItem = new Watchlist({ userId, movieId });
        await watchlistItem.save();

        res.status(201).json({ message: "Movie added to watchlist", watchlistItem });
    } catch (error) {
        next(error);
    }
};

// ✅ Remove a movie from the watchlist
export const removeFromWatchlist = async (req, res, next) => {
    try {
        const { movieId } = req.params;
        const userId = req.user.id;

        const watchlistItem = await Watchlist.findOneAndDelete({ userId, movieId });

        if (!watchlistItem) {
            return res.status(404).json({ message: "Movie not found in the watchlist" });
        }

        res.json({ message: "Movie removed from watchlist" });
    } catch (error) {
        next(error);
    }
};

// ✅ Get a user's watchlist
export const getWatchlist = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const watchlist = await Watchlist.find({ userId }).populate("movieId", "title poster_url");

        res.json(watchlist);
    } catch (error) {
        next(error);
    }
};
