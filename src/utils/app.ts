import express, { Request, NextFunction, Response, Express } from "express";
import deserializeUser from './authHandle';
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";


import UsersRoutes from "../routes/users.routes";
import StationRoutes from "../routes/stations.routes";
import carriageRoutes from "../routes/carriage.routes";
import bookingRoutes from "../routes/booking.routes";
import responseTime from "response-time";
import swaggerUI from 'swagger-ui-express';

export default function App() {

    const app: Express = express();


    app.use(express.json());
    app.use(cookieParser());
    app.use(deserializeUser)
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(helmet());
    app.use(responseTime())
    app.use(morgan('tiny'));

    app.use(cors({
        origin: "*",
        credentials: true
    }))

    app.use('/api/users', UsersRoutes);
    app.use('/api/stations', StationRoutes);
    app.use('/api/carriage', carriageRoutes);
    app.use('/api/booking', bookingRoutes);

    const swaggerDocument = require('./swagger.json');

    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        const status: number = error.status || 500;
        const message: object = error.message || "an error happened";
        return res.status(status).json({
            success: false,
            status: status,
            data: message
        })
    });

    return app;
}