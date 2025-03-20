import express from 'express';
import { getApplications, createApplication, updateApplication } from '../controllers/applicationController';

const router = express.Router();

router.get('/applications', getApplications);
router.post('/applications', createApplication);
router.put('/applications/:week', updateApplication);

export default router;
