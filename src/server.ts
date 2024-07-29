require('./config/env');

import express, { Application } from 'express';
import http, { Server } from 'http';
import https from 'https';
import helmet from 'helmet';
import cors from 'cors';
import { contentDatabase } from './config/db';
import AppRouter from './routes/index';
import UserRouter from './routes/users';

import { version } from './utils/index';

const app: Application = express();

// Express Middlewares
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use(express.json());

let server:Server;

app.use(`/api/${version}/`,AppRouter);
app.use(`/api/${version}/users`,UserRouter)


if(process.env.NODE_ENV === 'production'){
   server = https.createServer(app);
}
else{
  server = http.createServer(app);
}


// Start the server
const port = process.env.PORT || 8000;
server.listen(port, async () => {
  console.log(`Server is listening on port ${port}`);
  await contentDatabase.connection();
});



