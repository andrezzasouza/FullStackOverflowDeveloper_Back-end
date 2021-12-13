import joi from 'joi';

const idSchema = joi.object().length(1).keys({
  id: joi.number().min(1).integer().positive().required()
});

export { idSchema };
