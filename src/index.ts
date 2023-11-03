import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import App from './utils/app';

//For env File 
dotenv.config();

const app = App();
const port = process.env.PORT || 8000;


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});