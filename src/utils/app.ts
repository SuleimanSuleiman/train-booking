import express,{ Request,NextFunction,Response,Express} from "express";
import deserializeUser from './authHandle';
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "config";

import swaggerUI from "swagger-ui-express";
import swaggerJSDOC from "swagger-jsdoc";


import UsersRoutes from "../routes/users.routes";
import StationRoutes from "../routes/stations.routes";
import YAML from "yamljs";

export default function App() {

    const app: Express = express();

    
    app.use(express.json());
    app.use(cookieParser());
    app.use(deserializeUser)
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(helmet());
    app.use(morgan('tiny'));

    app.use(cors({
        origin: "*",
        credentials:true
    }))
 
    app.use('/api/users', UsersRoutes);
    app.use('/api/stations', StationRoutes);

    
    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
        const status:number = error.status || 500;
        const message:object = error.message || "an error happened";
        return res.status(status).json({
            success: false,
            status: status,
            data: message
        })
    })

    return app;
}