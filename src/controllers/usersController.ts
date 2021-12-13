import { Request, Response } from 'express';

async function addUser(req: Request, res: Response) {
  console.log(req, res);
}

export { addUser }