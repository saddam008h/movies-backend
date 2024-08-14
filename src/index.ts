import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db';
// routes
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import reviewRoutes from './routes/reviewRoutes';
//develpment or production
import clientPath from './utils/clientPath';


const app = express();
app.use(
  cors({
    credentials: true,
    origin: clientPath,
  }),
);

app.use(compression()); // compress HTTP responses for faster transmission
app.use(cookieParser()); // make cookies available in the req.cookies object
app.use(bodyParser.json());

//db integration
connectDB();

//use routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);

//test route
app.get('/', (req, res) => {
  res.send('Hello World! From Recapeo');
});

const server = http.createServer(app);
server.listen(8000, () => {
  console.log('Server running on http://localhost:8000/');
});
