import express from 'express';
import { 
    createCategory, 
    getCategories, 
    updateCategory, 
    deleteCategory 
} from '../controllers/categoryController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

//  Public Route (Anyone can view categories)
router.get('/', getCategories); 

//  Admin Routes (Only Admins can modify categories)
router.post('/', protect, adminProtect, createCategory); 
router.put('/:id', protect, adminProtect, updateCategory); 
router.delete('/:id', protect, adminProtect, deleteCategory); 

export {router as categoryRouter};
