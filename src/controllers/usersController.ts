import { Request, Response } from 'express';
import NewUser from '../interfaces/userInterface';
import * as usersService from '../services/usersService';

async function addUser(req: Request, res: Response) {
  try {
    const user: NewUser = req.body;

    if (!user.name || !user.class) {
      return res.sendStatus(400);
    }

    const userFormat = await usersService.validateUser(user);

    if (userFormat) {
      return res.status(400).send({ message: userFormat.details[0].message })
    }

    const userExists = await usersService.checkExistentUsers(user);

    if (userExists) {
      return res.sendStatus(409);
    }

    const registerUser = await usersService.addNewUser(user);

    if (registerUser) {
      return res.status(201).send(registerUser);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
  
}

export { addUser }