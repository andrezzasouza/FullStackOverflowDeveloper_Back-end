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

async function checkDataExistance(token: string, id: number) {
  const checkDataExistanceInDB = await answerRepository.checkDataExistanceInDB(
    token,
    id
  );

  if (checkDataExistanceInDB) {
    return 'user';
  }
  if (checkDataExistanceInDB)
    if (checkDataExistanceInDB) {
      return true;
    }

  return null;
}

async function addNewAnswer(answer: string, token: string, id: number) {
  const addNewAnswerToDB = await answerRepository.addNewAnswerToDB(
    answer,
    token,
    id
  );

  if (addNewAnswerToDB === null) {
    return null;
  }

  if (!addNewAnswerToDB.answered) {
    return true;
  }

  if (addNewAnswerToDB.answered) {
    return false;
  }
}

export { validateIdAnswer, checkDataExistance, addNewAnswer };
