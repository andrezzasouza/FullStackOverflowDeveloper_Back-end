import connection from '../database/database';
import NewQuestion from '../interfaces/questionInterface';

async function searchQuestionInDB(question: NewQuestion) {
  const result = await connection.query(
    `
      SELECT * FROM questions
      WHERE question = $1
      AND student = $2
      AND class = $3
    `, [question.question, question.student, question.class]
  )
  return result.rows[0];
}

async function addQuestionToDB(question: NewQuestion) {
  const result = await connection.query(
    `
      INSERT INTO questions (question, student, class, tags)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `, [question.question, question.student, question.class, question.tags]
  )
  return result.rows[0];
}

export { searchQuestionInDB, addQuestionToDB };