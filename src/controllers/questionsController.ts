import { Request, Response } from 'express';
import * as questionsService from '../services/questionsService';
import NewQuestion from '../interfaces/questionInterface';

async function addQuestion(req: Request, res: Response) {
  try {
    const question: NewQuestion = req.body;
    
    if (!question.question || !question.student || !question.class || !question.tags) {
      return res.sendStatus(400);
    }

    const questionFormat = await questionsService.validateQuestion(question);

    if (questionFormat) {
      return res.status(400).send({ message: questionFormat.details[0].message });
    }
    
    const questionExists = await questionsService.checkExistentQuestions(question);
    
    if (questionExists) {
      return res.sendStatus(409);
    }

    if (questionExists === null) {
      return res.status(404).send({ message: "The selected class doesn't exist. Please, check and try again."});
    }
    
    const registerQuestion: number = await questionsService.addNewQuestion(question);

    if (registerQuestion) {
      return res.status(201).send(registerQuestion.toString());
    }

  } catch (err) {
    return res.sendStatus(500);
  }
}

export { addQuestion };