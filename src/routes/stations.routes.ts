import express ,{Router } from "express";
import ChickIfAuth from "../middleware/ChickIfAuth";
import ValidateResource from "../middleware/ValidateResource";
import { StoreJourneyStationSchema, StoreScheduleSchema,
    StoreStationSchema, 
    StoreTrainJourneySchema,
    getJourneyStationSchema, 
    getSheduleSchema, 
    getStationSchema, 
    getTrainJourneySchema, 
    updateStationSchema } from "../Schemas/station.schema";

import {
    StoreJourneyStation,
    getAllJourneyStation,
    getAllschedules,
    getJourneyStation,
    getSchedule,
    getStation,
    getStations,
    getTrainJourney,
    getTrainJournies,
    storeSchedule,
    storeStation,
    storeTrainJourney,
    updateStation,
} from "../controllers/station.controller";

const router:Router = express.Router();

//stations
router.get('/get-stations',ChickIfAuth,getStations);
router.get('/get-station/:id',[ChickIfAuth,ValidateResource(getStationSchema)],getStation);
router.post('/store-station',[ChickIfAuth, ValidateResource(StoreStationSchema)], storeStation);
router.put('/update-station/:id',[ChickIfAuth,ValidateResource(updateStationSchema)],updateStation);

//schedule
router.get('/all-schedule',[ChickIfAuth],getAllschedules);
router.get('/schedule/:id',[ChickIfAuth,ValidateResource(getSheduleSchema)],getSchedule);
router.post('/schedule/store',[ChickIfAuth,ValidateResource(StoreScheduleSchema)],storeSchedule);

//train journay
router.post('/train-journey/store',[ChickIfAuth,ValidateResource(StoreTrainJourneySchema)],storeTrainJourney);
router.get('/all-train-journey',[ChickIfAuth],getTrainJournies);
router.get('/train-journey/:id',[ChickIfAuth,ValidateResource(getTrainJourneySchema)],getTrainJourney);


//journey station 
router.get('/journey-station-all',[ChickIfAuth],getAllJourneyStation);
router.get('/journey-station/:id',[ChickIfAuth,ValidateResource(getJourneyStationSchema)],getJourneyStation);
router.post('/journey-station/store',[ChickIfAuth,ValidateResource(StoreJourneyStationSchema)],StoreJourneyStation);
// router.put('/journey-station/store',[ChickIfAuth,ValidateResource(getSheduleSchema)],storeJourneyStation);
// router.delete('/journey-station/store',[ChickIfAuth,ValidateResource(getSheduleSchema)],storeJourneyStation);



export default router;