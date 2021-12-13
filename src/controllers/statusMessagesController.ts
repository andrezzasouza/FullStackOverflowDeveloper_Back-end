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
    <li>POST /questions/:id</li>
    <li>POST /recommendations/:id/downvote</li>
    <li>GET /recommendations/random</li>
    <li>GET /recommendations/top/:amount</li>
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