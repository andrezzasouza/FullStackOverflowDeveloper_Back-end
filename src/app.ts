import express from 'express';
import cors from 'cors';
import questionsRouter from './routers/questionsRouter';
import messagesRouter from './routers/messagesRouter';
import usersRouter from './routers/usersRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/questions', questionsRouter);
app.use('/user', usersRouter);
app.use(messagesRouter);

export default app;