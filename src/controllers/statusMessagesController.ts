import { Request, Response } from 'express';

const healthMessage = `
  <h1>
    The server is up and running! Ask away! :D
  </h1 >
`;

const mainMessage = `
  <h1>
   Welcome to FullStackOverflow Developer!
  </h1>
  <p> Apart from this one, these are the available routes:</p>
  <ul>
    <li>POST /questions</li>
    <li>GET /questions/:id</li>
    <li>POST /questions/:id</li>
    <li>GET /questions</li>
    <li>POST /users</li>
    <li>GET /health</li>
  </ul>
  <p>
    For further information on FullStackOverflow Developer, please, consult
    <a href='https://github.com/andrezzasouza/FullStackOverflowDeveloper_Back-end'>its documentation here</a>.
  </p>
  <h2>Ask away! :D</h2>
`;

async function healthyServer(req: Request, res: Response) {
  res.send(healthMessage).status(200);
}

async function mainRoute(req: Request, res: Response) {
  res.send(mainMessage).status(200);
}
export { healthyServer, mainRoute };
