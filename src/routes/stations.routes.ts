import express ,{Router } from "express";
import ChickIfAuth from "../middleware/ChickIfAuth";
import ValidateResource from "../middleware/ValidateResource";
import { StoreStationSchema } from "../Schemas/station.schema";
import {storeStation} from "../controllers/station.controller";

const router:Router = express.Router();

router.get('/get-stations',ChickIfAuth,);
router.get('/get-station',ChickIfAuth,);
router.post('/store-station',[ChickIfAuth,ValidateResource(StoreStationSchema)],storeStation);
router.get('/update-station',ChickIfAuth,);

export default router;