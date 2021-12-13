import joi from 'joi';

const userSchema = joi.object().length(2).keys({
  name: joi.string().min(2).required(),
  class: joi.string().min(2).pattern(/^[T]{1}[0-9]{1,}$/).required(),
});

export { userSchema };
