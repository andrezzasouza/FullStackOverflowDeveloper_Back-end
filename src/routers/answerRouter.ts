import { Router } from 'express';
import { answerMiddleware } from '../middleware/auth';
import * as answerController from '../controllers/answerController';

const router = Router();
router.post('/questions/:id', answerMiddleware, answerController.addAnswer);

export default router;
