import { Router } from 'express';
import TrackerController from '../controllers';
import asyncHandler from '../../../infrastructure/common/handlers/asyncHandler';

const trackerController: TrackerController = new TrackerController();
const router: Router = Router();

router.post('/:project/start', asyncHandler(trackerController.start));
router.post('/:project/stop', asyncHandler(trackerController.stop));
router.get('/:project/report', asyncHandler(trackerController.report));
router.get('/report', asyncHandler(trackerController.report));

export default router;
