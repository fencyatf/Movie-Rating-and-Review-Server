import express from 'express'
import { 
    adminLogin, 
    adminLogout,
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
    deleteReview, 
    updateMovie,
    checkAdmin
} from '../controllers/adminController.js';
import { adminAuth  } from '../middleware/adminAuthMiddleware.js';

const router = express.Router()


//  Admin Authentication
router.post('/login', adminLogin);
router.get('/logout', adminAuth, adminLogout);

//  User Management
router.get('/users', adminAuth, getAllUsers);
router.put('/users/ban/:id', adminAuth, banUser);
router.put('/users/unban/:id', adminAuth, unbanUser);
router.delete('/users/:id', adminAuth, deleteUser);

//  Movie Management
router.get('/movies', adminAuth, getAllMovies);
router.post('/movies', adminAuth, addMovie);  
router.put('/movies/:id', adminAuth, updateMovie);  
router.delete('/movies/:id', adminAuth, deleteMovie);

//  Review Management
router.get('/reviews', adminAuth, getAllReviews);
router.delete('/reviews/:id', adminAuth, deleteReview);

//  Report Management
router.get('/reports', adminAuth, getReports);
router.put('/reports/:id', adminAuth, resolveReport);


// Checking Admin
router.get('/check-admin',adminAuth,checkAdmin);

export {router as adminRouter};