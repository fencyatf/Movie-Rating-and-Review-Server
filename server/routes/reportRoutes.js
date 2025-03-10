import express from 'express';
import { 
    reportReview, 
    getReports, 
    updateReportStatus 
} from '../controllers/reportController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

//  Report a review
router.post('/', protect, reportReview);

//  Get all reports (Admin)
router.get('/', protect, adminProtect, getReports);

//  Update report status (Admin)
router.put('/:reportId', protect, adminProtect, updateReportStatus);

export {router as reportRouter};