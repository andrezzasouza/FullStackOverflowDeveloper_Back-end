import * as questionsRepository from '../repositories/questionsRepository';
import { questionSchema } from '../validations/questionSchema';
import { idSchema } from '../validations/idSchema';
import NewQuestion from '../interfaces/questionInterface';

async function validateQuestion(question: NewQuestion) {
  const errors = questionSchema.validate(question).error;

  if (errors) {
    return errors;
  }
}

async function checkExistentQuestions(question: NewQuestion) {
  const searchQuestionInDB = await questionsRepository.searchQuestionInDB(
    question
  );

  if (searchQuestionInDB?.question) {
    return searchQuestionInDB;
  }

  if (searchQuestionInDB === null) {
    return null;
  }
}

async function addNewQuestion(question: NewQuestion) {
  const addQuestionToDB: number = await questionsRepository.addQuestionToDB(
    question
  );

  if (addQuestionToDB) {
    return addQuestionToDB;
  }
}

async function getAllUnanswered() {
  const getAllUnansweredFromDB: object[] =
    await questionsRepository.getAllUnansweredFromDB();

  if (getAllUnansweredFromDB?.length > 0) {
    return getAllUnansweredFromDB;
  }

  if (getAllUnansweredFromDB?.length === 0) {
    return null;
  }
}

async function validateId(id: number) {
  const errors = idSchema.validate({ id }).error;

  if (errors) {
    return errors;
  }
}

async function getSingleQuestionById(id: number) {
  const getSingleQuestionByIdFromDB =
    await questionsRepository.getSingleQuestionByIdFromDB(id);

  if (getSingleQuestionByIdFromDB?.question) {
    return getSingleQuestionByIdFromDB;
  }

  if (!getSingleQuestionByIdFromDB) {
    return null;
  }
}

export {
  validateQuestion,
  checkExistentQuestions,
  addNewQuestion,
  getAllUnanswered,
  validateId,
  getSingleQuestionById
};
