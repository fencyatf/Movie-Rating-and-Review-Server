import express from 'express';
import { 
    addToWatchlist, 
    removeFromWatchlist, 
    getWatchlist 
} from '../controllers/watchlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//  User Routes (Only logged-in users)
router.post('/:movieId', protect, addToWatchlist); 
router.delete('/:movieId', protect, removeFromWatchlist); 
router.get('/', protect, getWatchlist); 

export {router as watchlistRouter};