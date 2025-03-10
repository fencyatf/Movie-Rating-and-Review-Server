import express from 'express';
import {
    userSignup,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    changeUserPassword,
    deleteMyAccount,
    deleteUserByAdmin,
    banUserByAdmin,
    forgotPassword,
    resetPassword,
    getUserWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    getUserReviews,
    getUserReactions
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

//  Authentication & User Management
router.post('/signup', userSignup);
router.post('/login', loginUser);
router.post('/logout', protect, logoutUser);

//  Profile Management
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/profile/change-password', protect, changeUserPassword);

//  Account Management
router.delete('/delete-my-account', protect, deleteMyAccount);
router.delete('/:id', protect, admin, deleteUserByAdmin);
router.put('/:id/ban', protect, admin, banUserByAdmin);

//  Password Reset
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

//  Watchlist & Favorites
router.get('/watchlist', protect, getUserWatchlist);
router.post('/watchlist/:movieId', protect, addToWatchlist);
router.delete('/watchlist/:movieId', protect, removeFromWatchlist);

//  User Activity (Reviews & Reactions)
router.get('/:id/reviews', getUserReviews);
router.get('/:id/reactions', getUserReactions);

export  {router as userRouter};