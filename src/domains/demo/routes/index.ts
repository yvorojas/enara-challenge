import { Router } from 'express';
import DemoController from '../controllers';
import asyncHandler from '../../../infrastructure/common/handlers/asyncHandler';

const demoController = new DemoController();
const router = Router();

router.get('/', asyncHandler(demoController.getInfo));
router.post('/validate', demoController.validateEntity);
router.get('/client', asyncHandler(demoController.callToClient));

export default router;
