import joi from 'joi';

const idSchema = joi
  .object()
  .length(1)
  .keys({
    id: joi.number().min(1).integer().positive().required()
  });

const idAnswerSchema = joi
  .object()
  .length(2)
  .keys({
    id: joi.number().min(1).integer().positive().required(),
    answer: joi.string().min(3).required()
  });

export { idSchema, idAnswerSchema };
