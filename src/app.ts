import express from 'express';
import bodyParser from 'body-parser';
import recommendationsRouter from './routes/recommendations';
import usersRouter from './routes/users';
import { initializeDatabase } from './utils/database';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/recommendations', recommendationsRouter);
app.use('/users', usersRouter);

export default app;
