import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

import taskRouter from './src/routes/taskRoutes.js';
import errorMiddleware from './src/middleware/errorMiddleware.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(morgan('dev'));

app.use(helmet());

app.use(express.json());

app.use('/api/tasks', taskRouter);

app.get('/', (req, res) => {
  res.send('TaskFlow API Running');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});