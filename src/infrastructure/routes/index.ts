import { Router } from 'express';
import openApiRoute from './openApi';
import trackerRoutes from '../../domains/tracker/routes';

const router = Router();
router.use('/api/v1/tracker', trackerRoutes);
router.use(openApiRoute);

export default router;
