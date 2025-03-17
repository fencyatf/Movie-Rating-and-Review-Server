import { Movie } from "../models/movieModel.js";

// Create a new movie (Admin only)
export const addMovie = async (req, res, next) => {
    try {
        const { 
            title, genre, releaseDate, director, duration, description, posterUrl, trailerUrl} = req.body;

        // Check if the movie already exists
        const existingMovie = await Movie.findOne({ title });
        if (existingMovie) {
            return next(new Error("Movie already exists"));
        }

        const newMovie = new Movie({
            title,
            genre,
            releaseDate,
            director,
            duration,
            description,
            posterUrl,
            trailerUrl
        });

        const savedMovie = await newMovie.save();
        res.status(201).json(savedMovie);
    } catch (error) {
        next(error);
    }
};


// Get all movies
export const getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find({});
        res.json(movies);
    } catch (error) {
        next(error);
    }
};

// Get a single movie by ID
export const getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return next(new Error("Movie not found"));
        }

        res.json(movie);
    } catch (error) {
        next(error);
    }
};

// Update a movie (Admin only)
export const updateMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return next(new Error("Movie not found"));
        }

        movie.title = req.body.title || movie.title;
        movie.genre = req.body.genre || movie.genre;
        movie.releaseDate = req.body.releaseDate || movie.releaseDate;
        movie.director = req.body.director || movie.director;
        movie.duration = req.body.duration || movie.duration;
        movie.description = req.body.description || movie.description;
        movie.posterUrl = req.body.posterUrl || movie.posterUrl;
        movie.trailerUrl = req.body.trailerUrl || movie.trailerUrl;
        

        const updatedMovie = await movie.save();
        res.json(updatedMovie);
    } catch (error) {
        next(error);
    }
};

// Delete a movie (Admin only)
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

// Search movies by title or genre
export const searchMovies = async (req, res, next) => {
    try {
        const searchQuery = req.params.query;

        // Search by title using case-insensitive regex
        const movies = await Movie.find({ 
            title: { $regex: searchQuery, $options: "i" } 
        });

        if (movies.length === 0) {
            return res.status(404).json({ message: "No movies found" });
        }

        res.json(movies);
    } catch (error) {
        next(error);
    }
};


// Get movies by genre
export const filterMoviesByGenre = async (req, res, next) => {
    try {
        const { genre } = req.params;

        // Case-insensitive search using regex
        const movies = await Movie.find({ genre: { $regex: new RegExp(genre, "i") } });

        if (movies.length === 0) {
            return res.status(404).json({ message: "No movies found in this genre" });
        }

        res.json(movies);
    } catch (error) {
        next(error);
    }
};

