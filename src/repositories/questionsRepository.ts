import { QueryResult } from 'pg';
import connection from '../database/database';
import NewQuestion from '../interfaces/questionInterface';

async function searchQuestionInDB(question: NewQuestion) {
  const getClass: QueryResult = await connection.query(
    `
      SELECT id FROM classes
      WHERE class = $1
    `, [question.class]
  );

  if (getClass.rowCount === 0) {
    return null;
  }

  const result: QueryResult = await connection.query(
    `
      SELECT * FROM questions
      WHERE question = $1
      AND student = $2
      AND class_id = $3
    `, [question.question, question.student, getClass.rows[0].id]
  );

  return result.rows[0];
}

async function addQuestionToDB(question: NewQuestion) {
  const getClass: QueryResult = await connection.query(
    `
      SELECT id FROM classes
      WHERE class = $1
    `, [question.class]
  );

  let getTagId: QueryResult = await connection.query(
    `
      SELECT id FROM tags
      WHERE tags = $1
    `, [question.tags]
  );

  if (getTagId.rowCount === 0) {
    getTagId = await connection.query(
      `
        INSERT INTO tags (tags)
        VALUES ($1)
        RETURNING id
      `, [question.tags]
    );
  }
  
  const result: QueryResult = await connection.query(
    `
      INSERT INTO questions (question, student, class_id)
      VALUES ($1, $2, $3)
      RETURNING id
    `, [question.question, question.student, getClass.rows[0].id]
  );

  await connection.query(
    `
      INSERT INTO questions_tags (questions_id, tags_id)
      VALUES ($1, $2)
    `, [result.rows[0].id, getTagId.rows[0].id]
  )
  
  return result.rows[0].id;
}

export { searchQuestionInDB, addQuestionToDB };