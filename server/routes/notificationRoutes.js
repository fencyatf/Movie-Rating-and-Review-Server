import express from 'express';
import { 
    getUserNotifications, 
    markAsRead, 
    deleteNotification 
} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

//  Get notifications for a user
router.get('/', protect, getUserNotifications);

//  Mark a notification as read
router.put('/:notificationId', protect, markAsRead);

//  Delete a notification
router.delete('/:notificationId', protect, deleteNotification);

export {router as notificationRouter};
