import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import api from './routes';
import errorHandle from './helpers/errorHandle';

const app = express();
dotenv.config();
/**
 * App configurations
 */
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', api);
app.use(cookieParser());

app.get('/', (_req, res) => {
  res.send('hello world');
});

app.use(errorHandle);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  mongoose.connect(process.env.MONGO_URI as string,
    { useNewUrlParser: true, useUnifiedTopology: true });
  // eslint-disable-next-line no-console
  console.log('Express server is running on port:', port);
});