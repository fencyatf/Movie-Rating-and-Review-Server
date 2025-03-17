import express from 'express';
import { 
    addGenreToMovie, 
    removeGenreFromMovie, 
    getMoviesByGenre 
} from '../controllers/movieGenreController.js';
import { userAuth } from '../middleware/userAuthMiddleware.js';

const router = express.Router();

//  Get all movies by a specific genre
router.get('/:categoryId', getMoviesByGenre);

//  Admin-only routes for managing movie-genre relationships
router.post('/', userAuth,  addGenreToMovie); 
router.delete('/:movieId/:categoryId', userAuth,  removeGenreFromMovie);

export {router as movieGenreRouter};