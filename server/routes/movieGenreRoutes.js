import express from 'express';
import { 
    addGenreToMovie, 
    removeGenreFromMovie, 
    getMoviesByGenre 
} from '../controllers/movieGenreController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

//  Get all movies by a specific genre
router.get('/:categoryId', getMoviesByGenre);

//  Admin-only routes for managing movie-genre relationships
router.post('/', protect, adminProtect, addGenreToMovie); 
router.delete('/:movieId/:categoryId', protect, adminProtect, removeGenreFromMovie);

export {router as movieGenreRouter};