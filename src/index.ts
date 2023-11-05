import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import App from './utils/app';
import cluster from 'cluster';
import cacheNode from "node-cache";
import os from 'os-utils';

//For env File 
dotenv.config();




const app = App();
const port = process.env.PORT || 8000;
const cache = new cacheNode();


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  const numCPUs = require('os').cpus().length;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });

} else {

  app.listen(port, () => {
    
    // os.cpuUsage(function(v){
    //   console.log( 'CPU Usage (%): ' + v );
    // });
      console.log(`Worker ${process.pid} is up on localhost:${port}`);
  });
}