import { Request, Response } from 'express';
import * as questionsService from '../services/questionsService';
import NewQuestion from '../interfaces/questionInterface';

// add type to consts

async function addQuestion(req: Request, res: Response) {
  try {
    const question: NewQuestion = req.body;
    
    if (!question.question || !question.student || !question.class || !question.tags) {
      return res.sendStatus(400);
    }

    const questionFormat = await questionsService.validateQuestion(question);

    if (questionFormat) {
      return res.sendStatus(400);
    }

    if (questionFormat) {
      return res.status(400).send({ message: questionFormat.details[0].message });
    }

    const questionExists = await questionsService.checkExistentQuestions(question);

    if (questionExists) {
      return res.sendStatus(409);
    }

    const registerQuestion = await questionsService.addNewQuestion(question);

    if (registerQuestion) {
      return res.status(201).send(registerQuestion);
    }

  } catch (err) {
    return res.sendStatus(500);
  }
}

export { addQuestion };