import dayjs from 'dayjs';
import { ValidationError } from 'joi';
import * as questionsRepository from '../repositories/questionsRepository';
import { Answered, NotAnswered } from '../interfaces/answerInterface';
import { questionSchema } from '../validations/questionSchema';
import { idSchema } from '../validations/idSchema';
import NewQuestion from '../interfaces/questionInterface';

async function validateQuestion(question: NewQuestion) {
  const errors: ValidationError = questionSchema.validate(question).error;

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
  const getAllUnansweredFromDB =
    await questionsRepository.getAllUnansweredFromDB();

  if (getAllUnansweredFromDB?.length > 0) {
    const FormattedDate = dayjs(getAllUnansweredFromDB[0]?.submitAt).format(
      'YYYY-MM-DD HH:mm'
    );
    const FormattedQuestions = {
      ...getAllUnansweredFromDB,
      submitAt: FormattedDate
    };
    return FormattedQuestions;
  }

  if (getAllUnansweredFromDB?.length === 0) {
    return null;
  }
}

async function validateId(id: number) {
  const errors: ValidationError = idSchema.validate({ id }).error;

  if (errors) {
    return errors;
  }
}

async function getSingleQuestionById(id: number) {
  const getSingleQuestionByIdFromDB =
    await questionsRepository.getSingleQuestionByIdFromDB(id);

  if (!getSingleQuestionByIdFromDB?.answeredAt) {
    const FormattedDate = dayjs(getSingleQuestionByIdFromDB?.submitAt).format(
      'YYYY-MM-DD HH:mm'
    );
    const newDataObject: NotAnswered = {
      ...getSingleQuestionByIdFromDB,
      submitAt: FormattedDate
    };
    return newDataObject;
  }

  if (getSingleQuestionByIdFromDB?.answeredAt) {
    const answeredQuestion: Answered = getSingleQuestionByIdFromDB;
    const FormattedDateSubmit = dayjs(answeredQuestion?.submitAt).format(
      'YYYY-MM-DD HH:mm'
    );
    const FormattedDateAnswer = dayjs(answeredQuestion?.answeredAt).format(
      'YYYY-MM-DD HH:mm'
    );
    const newDataObject: Answered = {
      ...answeredQuestion,
      submitAt: FormattedDateSubmit,
      answeredAt: FormattedDateAnswer
    };
    return newDataObject;
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
