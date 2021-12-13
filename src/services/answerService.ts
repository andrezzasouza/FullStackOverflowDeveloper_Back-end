import { ValidationError } from 'joi';
import { idAnswerSchema } from '../validations/idSchema';
import * as answerRepository from '../repositories/answerRepository';

async function validateIdAnswer(id: number, answer: string) {
  const errors: ValidationError | undefined = idAnswerSchema.validate({
    id,
    answer
  }).error;

  if (errors) {
    return errors;
  }
}

async function checkDataExistance(id: number) {
  const checkDataExistanceInDB = await answerRepository.checkDataExistanceInDB(
    id
  );

  if (checkDataExistanceInDB?.question && checkDataExistanceInDB?.answered) {
    return 'answered';
  }

  if (checkDataExistanceInDB?.question && !checkDataExistanceInDB?.answered) {
    return 'unanswered';
  }

  if (!checkDataExistanceInDB?.question) {
    return null;
  }
}

async function addNewAnswer(answer: string, token: string, id: number) {
  const addNewAnswerToDB = await answerRepository.addNewAnswerToDB(
    answer,
    token,
    id
  );

  if (addNewAnswerToDB?.question && addNewAnswerToDB?.answered) {
    return true;
  }
}

export { validateIdAnswer, checkDataExistance, addNewAnswer };
