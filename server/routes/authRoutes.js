import express from 'express';
import { 
    userSignup, 
    loginUser, 
    logoutUser, 
    forgotPassword, 
    resetPassword 
} from '../controllers/authController.js';

const router = express.Router();

//  User signup
router.post('/signup', userSignup);

//  User login
router.post('/login', loginUser);

//  User logout
router.post('/logout', logoutUser);

//  Forgot password (sends reset email)
router.post('/forgot-password', forgotPassword);

//  Reset password
router.post('/reset-password/:token', resetPassword);

export {router as authRouter};
