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
import { userAuth, adminOnly } from '../middleware/userAuthMiddleware.js';

const router = express.Router();

//  Public Routes (Accessible by all users)
router.get('/', getAllMovies); 
router.get('/:id', getMovieById); 
router.get('/search/:query', searchMovies); 
router.get('/genre/:genre', filterMoviesByGenre); 

//  Admin Routes (Only accessible by admins)
router.post('/', userAuth, adminOnly, addMovie); 
router.put('/:id', userAuth, adminOnly, updateMovie); 
router.delete('/:id', userAuth, adminOnly, deleteMovie); 

export {router as movieRouter};