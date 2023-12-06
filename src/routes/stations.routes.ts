import express ,{Router } from "express";
import ChickIfAuth from "../middleware/ChickIfAuth";
import ValidateResource from "../middleware/ValidateResource";
import { StoreJourneyStationSchema, StoreScheduleSchema,
    StoreStationSchema, 
    StoreTrainJourneySchema,
    getAllStationsSchema,
    getJourneyStationSchema, 
    getSheduleSchema, 
    getStationSchema, 
    getTrainJourneySchema,  
    searchStationSchema, 
    updateStationSchema } from "../Schemas/station.schema";

import {
    SearchTrainJourney,
    StoreJourneyStation,
    getAllJourneyStation,
    getAllschedules,
    getJourneyStation,
    getJournyStations,
    getSchedule,
    getStation,
    getStations,
    getTrainJourney,
    getTrainJournies,
    searchStation,
    seed_journies,
    seed_journies_station,
    seed_stations,
    storeSchedule,
    storeStation,
    storeTrainJourney,
    updateStation,
} from "../controllers/station.controller";
import { client } from "../utils/config_redis";

const router:Router = express.Router();

router.get("/",async (req,res)=>{
    let name = await client.get('name')
    let age = await client.get('age')
    res.json({
        name: name,
        age: age
    })
})

//stations
router.get('/seed-stations',ChickIfAuth,seed_stations)
router.get('/get-stations',[ChickIfAuth,ValidateResource(getAllStationsSchema)],getStations);
router.get('/get-station/:id',[ChickIfAuth,ValidateResource(getStationSchema)],getStation);
router.post('/store-station',[ChickIfAuth, ValidateResource(StoreStationSchema)], storeStation);
router.put('/update-station/:id',[ChickIfAuth,ValidateResource(updateStationSchema)],updateStation);
router.get('/search-station',[ChickIfAuth,ValidateResource(searchStationSchema)],searchStation);

//schedule
router.get('/all-schedule',[ChickIfAuth],getAllschedules);
router.get('/schedule/:id',[ChickIfAuth,ValidateResource(getSheduleSchema)],getSchedule);
router.post('/schedule/store',[ChickIfAuth,ValidateResource(StoreScheduleSchema)],storeSchedule);

//train journay
router.get('/seed-journey',ChickIfAuth,seed_journies)
router.post('/train-journey/store',[ChickIfAuth,ValidateResource(StoreTrainJourneySchema)],storeTrainJourney);
router.get('/all-train-journey',[ChickIfAuth],getTrainJournies);
router.get('/train-journey/:id',[ChickIfAuth,ValidateResource(getTrainJourneySchema)],getTrainJourney);
router.get('/search-train-journey',[ChickIfAuth,ValidateResource(searchStationSchema)],SearchTrainJourney);


//journey station 
router.get('/journey-station-all',[ChickIfAuth],getAllJourneyStation);
router.get('/seed-journey-station',ChickIfAuth,seed_journies_station);
router.get('/journey-stations/:id',[ChickIfAuth,ValidateResource(getJourneyStationSchema)],getJournyStations);
router.post('/journey-station/store',[ChickIfAuth,ValidateResource(StoreJourneyStationSchema)],StoreJourneyStation);
// router.put('/journey-station/store',[ChickIfAuth,ValidateResource(getSheduleSchema)],storeJourneyStation);
// router.delete('/journey-station/store',[ChickIfAuth,ValidateResource(getSheduleSchema)],storeJourneyStation);



export default router;