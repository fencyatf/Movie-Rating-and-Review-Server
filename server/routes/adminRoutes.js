import express from 'express'
import { 
    adminLogin, 
    getAllUsers, 
    banUser, 
    unbanUser, 
    deleteUser, 
    getReports, 
    resolveReport, 
    getAllMovies, 
    addMovie,  
    deleteMovie, 
    getAllReviews, 
    deleteReview 
} from '../controllers/adminController.js';
import { adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router()


//  Admin Authentication
router.post('/login', adminLogin);

//  User Management
router.get('/users', adminProtect, getAllUsers);
router.put('/users/ban/:id', adminProtect, banUser);
router.put('/users/unban/:id', adminProtect, unbanUser);
router.delete('/users/:id', adminProtect, deleteUser);

//  Movie Management
router.get('/movies', adminProtect, getAllMovies);
router.post('/movies', adminProtect, addMovie);  
router.delete('/movies/:id', adminProtect, deleteMovie);

//  Review Management
router.get('/reviews', adminProtect, getAllReviews);
router.delete('/reviews/:id', adminProtect, deleteReview);

//  Report Management
router.get('/reports', adminProtect, getReports);
router.put('/reports/:id', adminProtect, resolveReport);

export {router as adminRouter};