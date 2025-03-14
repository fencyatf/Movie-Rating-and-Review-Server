import express from 'express';
import { 
    reportReview, 
    getReports, 
    updateReportStatus 
} from '../controllers/reportController.js';
import { userAuth, adminOnly } from '../middleware/userAuthMiddleware.js';

const router = express.Router();

//  Report a review
router.post('/', userAuth, reportReview);

//  Get all reports (Admin)
router.get('/', userAuth, adminOnly, getReports);

//  Update report status (Admin)
router.put('/:reportId', userAuth, adminOnly, updateReportStatus);

export {router as reportRouter};