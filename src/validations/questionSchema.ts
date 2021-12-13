import joi from 'joi';

const questionSchema = joi.object().length(4).keys({
  question: joi.string().min(5).required(),
  student: joi.string().min(2).required(),
  class: joi.string().min(2).pattern(/^[T]{1}[0-9]{1,}$/).required(),
  tags: joi.string().min(2).required()
})

export { questionSchema };
