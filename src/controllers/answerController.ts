import { Request, Response } from 'express';
import * as answerService from '../services/answerService';

async function addAnswer(req: Request, res: Response) {
  try {
    const { answer } = req.body;
    const { id } = req.params;

    const { authorization } = req.headers;
    const token: string = authorization?.replace('Bearer ', '');

    if (!id) {
      return res.sendStatus(400);
    }

    const numId: number = Number(id);

    const idFormatAnswer = await answerService.validateIdAnswer(numId, answer);

    if (idFormatAnswer) {
      return res
        .status(400)
        .send({ message: idFormatAnswer.details[0].message });
    }

    const checkDataExistance = await answerService.checkDataExistance(numId);

    if (checkDataExistance === null) {
      return res.status(404).send({
        message:
          "This questions couldn't be found. Please, check and try again!"
      });
    }

    if (checkDataExistance === 'answered') {
      return res.status(409).send({
        message:
          'This questions has already been answered. Please, choose another question.'
      });
    }

    const addNewAnswer = await answerService.addNewAnswer(answer, token, numId);

    if (addNewAnswer) {
      return res.sendStatus(201);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
}

export { addAnswer };
