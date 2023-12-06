import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import App from './utils/app';
import cluster from 'cluster';
import { client } from './utils/config_redis';
import os from 'os-utils';

//For env File 
dotenv.config();

const port = process.env.PORT || 8000;
const redis_port = process.env.REDIS_PORT || 6379;

const app = App();


const start = async () => {
  try {
      await client.connect()
      app.listen(redis_port, () => {
          console.log(`Server is connected to redis and is listening on port ${redis_port}`)
      })
  } catch (error) {
      console.log(error)
  }
}


app.get('/', (req: Request, res: Response) => {
  
  res.send('Welcome to Express & TypeScript Server');
});

// if (cluster.isPrimary) {
  
//   console.log(`Master ${process.pid} is running`);

//   const numCPUs = require('os').cpus().length;

//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`Worker ${worker.process.pid} died`);
//   });

// } else {

  // start();
  app.listen(port, () => {
    os.cpuUsage(function(v){
      console.log( 'CPU Usage (%): ' + v );
    });
    console.log(`Worker ${process.pid} is up on http://localhost:${port}`);
  });
// }