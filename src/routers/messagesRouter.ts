import { Router } from 'express';
import * as statusMessagesController from '../controllers/statusMessagesController';

const router = Router();
router.get('/', statusMessagesController.mainRoute);
router.get('/health', statusMessagesController.healthyServer);

export default router;