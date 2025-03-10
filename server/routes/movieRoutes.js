import express from 'express';
import { 
    addMovie, 
    getAllMovies, 
    getMovieById, 
    updateMovie, 
    deleteMovie, 
    searchMovies, 
    filterMoviesByGenre 
} from '../controllers/movieController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

//  Public Routes (Accessible by all users)
router.get('/', getAllMovies); 
router.get('/:id', getMovieById); 
router.get('/search/:query', searchMovies); 
router.get('/genre/:genre', filterMoviesByGenre); 

//  Admin Routes (Only accessible by admins)
router.post('/', protect, adminOnly, addMovie); 
router.put('/:id', protect, adminOnly, updateMovie); 
router.delete('/:id', protect, adminOnly, deleteMovie); 

export {router as movieRouter};