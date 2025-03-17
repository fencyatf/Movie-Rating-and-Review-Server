import express from 'express';
import { 
    reportReview, 
    getReports, 
    updateReportStatus 
} from '../controllers/reportController.js';
import { userAuth } from '../middleware/userAuthMiddleware.js';

const router = express.Router();

//  Report a review
router.post('/', userAuth, reportReview);

//  Get all reports (Admin)
router.get('/', userAuth,  getReports);

//  Update report status (Admin)
router.put('/:reportId', userAuth,  updateReportStatus);

export {router as reportRouter};