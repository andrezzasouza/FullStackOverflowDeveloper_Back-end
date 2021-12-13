import { QueryResult } from 'pg';
import connection from '../database/database';

async function checkDataExistanceInDB(id: number) {
  const lookForQuestion: QueryResult = await connection.query(
    `
      SELECT * FROM questions
      WHERE id = $1
    `,
    [id]
  );

  return lookForQuestion.rows[0];
}

async function addNewAnswerToDB(answer: string, token: string, id: number) {
  const user: QueryResult = await connection.query(
    `
      SELECT users.id
      FROM
        users
      WHERE token = $1
    `,
    [token]
  );

  const addAnswer: QueryResult = await connection.query(
    `
      INSERT INTO answers (user_id, answer)
      VALUES($1, $2)
      RETURNING answers.id
    `,
    [user.rows[0].id, answer]
  );

  const updateQuestions: QueryResult = await connection.query(
    `
      UPDATE questions
      SET
        answer_id = $1,
        answered = $2
      WHERE
        questions.id = $3
      RETURNING *
    `,
    [addAnswer.rows[0].id, true, id]
  );

  return updateQuestions.rows[0];
}

export { checkDataExistanceInDB, addNewAnswerToDB };
