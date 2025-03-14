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
import { userAuth, adminOnly } from '../middleware/userAuthMiddleware.js';

const router = express.Router();

//  Public Routes (Accessible by all users)
router.get('/:movieId', getReviewsByMovie); 

//  User Routes (Only logged-in users)
router.post('/:movieId', userAuth, addReview); 
router.put('/:reviewId', userAuth, updateReview);
router.delete('/:reviewId', userAuth, deleteReview); 
router.post('/:reviewId/like', userAuth, likeReview); 
router.post('/:reviewId/dislike', userAuth, dislikeReview); 
router.post('/:reviewId/report', userAuth, reportReview); 

//  Admin Routes (Only admins)
router.delete('/:reviewId/admin', userAuth, adminOnly, deleteReview); 

export {router as reviewRouter};