import { QueryResult } from 'pg';
import connection from '../database/database';
import NewQuestion from '../interfaces/questionInterface';

async function searchQuestionInDB(question: NewQuestion) {
  const getClass: QueryResult = await connection.query(
    `
      SELECT id FROM classes
      WHERE class = $1
    `,
    [question.class]
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
    `,
    [question.question, question.student, getClass.rows[0].id]
  );

  return result.rows[0];
}

async function addQuestionToDB(question: NewQuestion) {
  const getClass: QueryResult = await connection.query(
    `
      SELECT id FROM classes
      WHERE class = $1
    `,
    [question.class]
  );

  let getTagId: QueryResult = await connection.query(
    `
      SELECT id FROM tags
      WHERE tags = $1
    `,
    [question.tags]
  );

  if (getTagId.rowCount === 0) {
    getTagId = await connection.query(
      `
        INSERT INTO tags (tags)
        VALUES ($1)
        RETURNING id
      `,
      [question.tags]
    );
  }

  const result: QueryResult = await connection.query(
    `
      INSERT INTO questions (question, student, class_id)
      VALUES ($1, $2, $3)
      RETURNING id
    `,
    [question.question, question.student, getClass.rows[0].id]
  );

  await connection.query(
    `
      INSERT INTO questions_tags (questions_id, tags_id)
      VALUES ($1, $2)
    `,
    [result.rows[0].id, getTagId.rows[0].id]
  );

  return result.rows[0].id;
}

async function getAllUnansweredFromDB() {
  const result: QueryResult = await connection.query(
    `
      SELECT questions.id, questions.question, questions.student, questions."submitAt", classes.class
      FROM questions
      JOIN classes ON questions.class_id = classes.id
      WHERE answered = $1
    `,
    [false]
  );

  return result.rows;
}

async function getSingleQuestionByIdFromDB(id: number) {
  const lookUpStatus = await connection.query(
    `
      SELECT * FROM questions WHERE id = $1
    `,
    [id]
  );
  if (lookUpStatus.rows.length === 0) {
    return null;
  }
  if (lookUpStatus?.rows[0]?.answered) {
    const result: QueryResult = await connection.query(
      `
        SELECT
          questions.question, questions.student, questions.answered, questions."submitAt",
          tags.tags,
          classes.class,
          answers."answeredAt", answers.answer,
          users.name AS "answeredBy"
        FROM
          questions
        JOIN
          questions_tags
        ON
          questions.id = questions_tags.questions_id
        JOIN
          tags
        ON
          questions_tags.tags_id = tags.id
        JOIN
          classes
        ON
          questions.class_id = classes.id
        JOIN
          answers
        ON
          questions.answer_id = answers.id
        JOIN
          users
        ON
          answers.user_id = users.id
        WHERE
          questions.id = $1
      `,
      [id]
    );
    return result.rows[0];
  }

  if (!lookUpStatus.rows[0].answered) {
    const result: QueryResult = await connection.query(
      `
      SELECT
          questions.question, questions.student, questions.answered, questions."submitAt",
          tags.tags,
          classes.class
        FROM
          questions
        JOIN
          questions_tags
        ON
          questions.id = questions_tags.questions_id
        JOIN
          tags
        ON
          questions_tags.tags_id = tags.id
        JOIN
          classes
        ON
          questions.class_id = classes.id
        WHERE
          questions.id = $1
      `,
      [id]
    );
    return result.rows[0];
  }
}

export {
  searchQuestionInDB,
  addQuestionToDB,
  getAllUnansweredFromDB,
  getSingleQuestionByIdFromDB
};
