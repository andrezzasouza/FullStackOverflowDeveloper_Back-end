import * as questionsRepository from '../repositories/questionsRepository';
import { questionSchema } from '../validations/questionSchema';
import NewQuestion from '../interfaces/questionInterface';

async function validateQuestion(question: NewQuestion) {
  const errors = questionSchema.validate(question).error;

  if (errors) {
    return errors;
  }
}

async function checkExistentQuestions(question: NewQuestion) {
  const searchQuestionInDB = await questionsRepository.searchQuestionInDB(question);

  if (searchQuestionInDB.length > 0) {
    return searchQuestionInDB;
  }
}

async function addNewQuestion(question: NewQuestion) {
  const addQuestionToDB = await questionsRepository.addQuestionToDB(question);

  if (addQuestionToDB.id) {
    return addQuestionToDB.id;
  }
  
}

export { validateQuestion, checkExistentQuestions, addNewQuestion };