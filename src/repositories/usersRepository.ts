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
      AND class = $2
    `, [user.name, user.class]
  )
  return result.rows[0];
}
async function addUserToDB(user: AddUser) {
  const result = await connection.query(
    `
      INSERT INTO users (name, class, token)
      VALUES ($1, $2, $3)
      RETURNING token;
    `, [user.name, user.class, user.token]
  )
  return result.rows[0];
}

export { searchUserInDB, addUserToDB }