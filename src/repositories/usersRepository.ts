import connection from '../database/database';
import NewUser from '../interfaces/userInterface';

interface AddUser extends NewUser {
  token: string;
}

async function searchUserInDB(user: NewUser) {
  const result = await connection.query(
    `
      SELECT * FROM users
      WHERE name = $1
    `, [user.name]
  )

  return result.rowCount;
}

async function addUserToDB(user: AddUser) {
  const getClass = await connection.query(
    `
      SELECT id FROM classes
      WHERE class = $1
    `, [user.class]
  );

  if (getClass.rowCount === 0) {
    return null;
  }

  const result = await connection.query(
    `
      INSERT INTO users (name, class_id, token)
      VALUES ($1, $2, $3)
      RETURNING token
    `, [user.name, getClass.rows[0].id, user.token]
  );

  return result.rows[0];
}

export { searchUserInDB, addUserToDB }