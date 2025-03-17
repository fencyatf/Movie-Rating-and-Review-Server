import express from 'express';
import {
    userSignup,
    loginUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    changeUserPassword,
    deleteMyAccount,
    forgotPassword,
    resetPassword,
    getUserWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    getUserReviews,
    getUserReactions,
    checkUser
} from '../controllers/userController.js';
import { userAuth } from '../middleware/userAuthMiddleware.js';

const router = express.Router();

//  Authentication & User Management
router.post('/signup', userSignup);
router.post('/login', loginUser);
router.get('/logout', userAuth, logoutUser);

//  Profile Management
router.get('/profile', userAuth, getUserProfile);
router.put('/profile', userAuth, updateUserProfile);
router.put('/profile/change-password', userAuth, changeUserPassword);

//  Account Management
router.delete('/delete-my-account', userAuth, deleteMyAccount);


//  Password Reset
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

//  Watchlist & Favorites
router.get('/watchlist', userAuth, getUserWatchlist);
router.post('/watchlist/:movieId', userAuth, addToWatchlist);
router.delete('/watchlist/:movieId', userAuth, removeFromWatchlist);

//  User Activity (Reviews & Reactions)
router.get('/:id/reviews', getUserReviews);
router.get('/:id/reactions', getUserReactions);



// Checking User
router.get('/check-user',userAuth,checkUser);

export  {router as userRouter};