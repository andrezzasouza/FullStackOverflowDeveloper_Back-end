import express from 'express';
import cors from 'cors';
import questionsRouter from './routers/questionsRouter';
import messagesRouter from './routers/messagesRouter';
import usersRouter from './routers/usersRouter';
import answerRouter from './routers/answerRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/questions', questionsRouter);
app.use('/users', usersRouter);
app.use(messagesRouter);
app.use(answerRouter);

export default app;
