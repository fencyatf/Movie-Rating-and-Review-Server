import express from 'express';
import { 
    createCategory, 
    getCategories, 
    updateCategory, 
    deleteCategory 
} from '../controllers/categoryController.js';
import { userAuth, adminOnly } from '../middleware/userAuthMiddleware.js';

const router = express.Router();

//  Public Route (Anyone can view categories)
router.get('/', getCategories); 

//  Admin Routes (Only Admins can modify categories)
router.post('/', userAuth, adminOnly, createCategory); 
router.put('/:id', userAuth, adminOnly, updateCategory); 
router.delete('/:id', userAuth, adminOnly, deleteCategory); 

export {router as categoryRouter};
