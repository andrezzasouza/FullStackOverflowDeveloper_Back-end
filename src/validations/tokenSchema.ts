import joi from 'joi';

const tokenSchema = joi
  .object()
  .length(1)
  .keys({
    token: joi
      .string()
      .guid({
        version: ['uuidv4']
      })
      .min(36)
      .max(36)
      .required()
  });

export { tokenSchema };
