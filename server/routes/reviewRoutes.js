import express from 'express';
import { 
    addReview, 
    updateReview, 
    deleteReview, 
    getReviewsByMovie, 
    likeReview, 
    dislikeReview, 
    reportReview 
} from '../controllers/reviewController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

//  Public Routes (Accessible by all users)
router.get('/:movieId', getReviewsByMovie); 

//  User Routes (Only logged-in users)
router.post('/:movieId', protect, addReview); 
router.put('/:reviewId', protect, updateReview);
router.delete('/:reviewId', protect, deleteReview); 
router.post('/:reviewId/like', protect, likeReview); 
router.post('/:reviewId/dislike', protect, dislikeReview); 
router.post('/:reviewId/report', protect, reportReview); 

//  Admin Routes (Only admins)
router.delete('/:reviewId/admin', protect, adminOnly, deleteReview); 

export {router as reviewRouter};