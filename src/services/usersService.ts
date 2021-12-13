import { v4 as uuid } from 'uuid';

import * as usersRepository from '../repositories/usersRepository';
import { userSchema } from '../validations/userSchema';
import NewUser from '../interfaces/userInterface';

async function validateUser(user: NewUser) {
  const errors = userSchema.validate(user).error;

  if (errors) {
    return errors;
  }
}

async function checkExistentUsers(user: NewUser) {
  const searchUserInDB = await usersRepository.searchUserInDB(user);

  if (searchUserInDB > 0) {
    return searchUserInDB;
  }
}

async function addNewUser(user: NewUser) {
  const token = uuid();

  const addUserToDB = await usersRepository.addUserToDB({ ...user, token });

  if (!addUserToDB) {
    return null;
  }
  
  if (addUserToDB?.token) {
    return addUserToDB.token;
  }

}

export { validateUser, checkExistentUsers, addNewUser };