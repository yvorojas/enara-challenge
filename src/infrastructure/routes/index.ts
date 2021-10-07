import { Router } from 'express';
import openApiRoute from './openApi';
import demoRoute from '../../domains/demo/routes';

const router = Router();
router.use('/api/v1/demo', demoRoute);
router.use(openApiRoute);

export default router;
