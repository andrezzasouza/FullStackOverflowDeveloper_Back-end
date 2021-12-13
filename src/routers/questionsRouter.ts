import { Router } from 'express';
import * as questionsController from '../controllers/questionsController';

const router = Router();
router.post('', questionsController.addQuestion);
router.get('', questionsController.getQuestions);
router.get('/:id', questionsController.getQuestionById);

export default router;
