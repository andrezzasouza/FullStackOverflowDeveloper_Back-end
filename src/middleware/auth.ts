import { NextFunction, Request, Response } from 'express';
import connection from '../database/database';
import { tokenSchema } from '../validations/tokenSchema';

async function answerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token: string = authorization?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(401)
      .send({ message: 'Denied access. Please, try again!' });
  }

  const errors = tokenSchema.validate({ token }).error;

  if (errors) {
    return res.status(400).send({ message: errors.details[0].message });
  }

  const checkUserToken = await connection.query(
    `
      SELECT * FROM users WHERE token = $1;
    `,
    [token]
  );

  if (checkUserToken.rowCount === 0) {
    return res
      .status(401)
      .send({ message: 'Denied access. Please, try again!.' });
  }

  next();
}

export { answerMiddleware };
