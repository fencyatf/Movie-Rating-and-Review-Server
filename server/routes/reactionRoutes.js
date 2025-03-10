import express from 'express';
import { 
    addReaction, 
    removeReaction, 
    getReactions 
} from '../controllers/reactionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//  Get all reactions for a review
router.get('/:reviewId', getReactions);

//  Add a like/dislike to a review
router.post('/', protect, addReaction);

//  Remove a reaction
router.delete('/:reactionId', protect, removeReaction);

export {router as reactionRouter};
