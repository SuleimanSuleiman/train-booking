import { Request, Response, NextFunction } from "express";
import {
    CreateJourneyStationInput, CreateScheduleInput,
    CreateStationInput,
    CreateTrainJourneyInput,
    GetScheduleInput,
    GetStationInput,
    UpdataStationInput,
    getAllStationsInput,
    getJourneyStationInput,
    getTrainJourneyInput,
    searchStationInput
} from '../Schemas/station.schema';

import {
    buildQueryForAllStations,
    getAllJourneyStationService,
    getAllSheduleService,
    getAllStationsCoverByJourneyService,
    getAllStationsService,
    getAllTrainJournies,
    getJourneyStationService,
    getScheduleService,
    getSearchStationsService,
    getSearchTrainJourneyService,
    getStationService,
    getTrainJourneyService,
    newJourneyStationService,
    newScheduleService,
    newStationService,
    newTrainJourneyService,
    updateStationService
} from "../services/station.service";

import HandleError from "../middleware/HandleError";
import { HandleSuccess } from "../middleware/HandleSuccess";

import cacheNode from "node-cache";
import { buildSelectQuery } from '../services/station.service';
import prisma from "../lib/prisma";
import { journies_seed, journies_station_seed, stations_seed } from "../seeders/seed";

const cache = new cacheNode();


export const seed_stations = async(
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    await prisma.train_station.createMany({
        data:stations_seed
    });
    return res.status(201).send("True")
}

export const getStations = async (
    req: Request<{}, {}, {}, getAllStationsInput['query']>,
    res: Response,
    next: NextFunction
) => {
    try {

        const query = buildQueryForAllStations({
            id: true,
            station_name: true,
            ...req.query
        });

        let allStations = await getAllStationsService(query);


        return res.status(200).json(HandleSuccess(allStations));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}

export const getStation = async (
    req: Request<GetStationInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {

        let id = parseInt(req.params.id);

        const query = buildSelectQuery({
            id: true,
            station_name: true,
            journey_stations: {
                select: {
                    id: true,
                    departure_time: true,
                    train_journey: {
                        select: {
                            id: true,
                        },
                    },
                },

            },
        })

        const getStation = await getStationService(id, query);

        return res.status(200).json(HandleSuccess(getStation));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}
export const storeStation = async (
    req: Request<{}, {}, CreateStationInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = req.body;

        const createNewStation = await newStationService(payload);

        if (!createNewStation) next(HandleError(400, { message: "Fail To Create New Station" }));

        return res.status(201).json(HandleSuccess(createNewStation));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}

export const updateStation = async (
    req: Request<UpdataStationInput['params'], {}, UpdataStationInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = parseInt(req.params.id);
        const payload = req.body;

        const UpdateStation = await updateStationService(id, payload);

        return res.status(200).json(HandleSuccess(UpdateStation));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}


export const searchStation = async (
    req: Request<{},{},{},searchStationInput['query']>,
    res:Response,
    next:NextFunction
) => {
    try{
        const searchVal:string = req.query.search || '';

        const getSearchStations = await getSearchStationsService(searchVal);

        return res.status(200).json(HandleSuccess(getSearchStations));
        
    }catch(error:any){
        next(HandleError(400, { message: error.message }))
    }
}



// schedule
export const getAllschedules = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const key = req.url;

        const cachedResponse = cache.get(key);

        if (cachedResponse) {
            console.log(`Serving from cache: ${key}`);
            return res.status(200).json(HandleSuccess(cachedResponse));
        } else {
            let allStations = await getAllSheduleService();
            console.log(`Caching response: ${key}`);
            cache.set(key, allStations);
            return res.status(200).json(HandleSuccess(allStations));
        }

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}


export const getSchedule = async (
    req: Request<GetScheduleInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {

        let id = parseInt(req.params.id);

        const query = buildSelectQuery({
            id: true,
            name: true,
            train_journies: {
                select: {
                    id: true,
                    journey_name: true
                }
            },
            carrige_price: {
                select: {
                    id: true,
                    price: true,
                    carriage_class: {
                        select: {
                            id: true,
                            class_name: true
                        }
                    }
                }
            }
        })

        const getStation = await getScheduleService(id, query);

        return res.status(200).json(HandleSuccess(getStation));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}

export const seed_journies = async (
    req:Request,
    res:Response,
    next:NextFunction
) =>{
    await prisma.train_journey.createMany({
        data:journies_seed
    });

    return res.status(201).send("True")
}

export const storeSchedule = async (
    req: Request<{}, {}, CreateScheduleInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = req.body;

        const createNewSchedule = await newScheduleService(payload);

        if (!createNewSchedule) next(HandleError(400, { message: "Fail To Create New schedule" }));

        return res.status(201).json(HandleSuccess(createNewSchedule));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}

export const storeTrainJourney = async (
    req: Request<{}, {}, CreateTrainJourneyInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = req.body;

        const createNewTrainJourney = await newTrainJourneyService(payload);

        if (!createNewTrainJourney) next(HandleError(400, { message: "Fail To Create New schedule" }));

        return res.status(201).json(HandleSuccess(createNewTrainJourney));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}

export const getTrainJournies = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const allTrainJournies = await getAllTrainJournies();
        return res.status(200).json(HandleSuccess(allTrainJournies));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}

export const getTrainJourney = async (
    req: Request<getTrainJourneyInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {

        let id = parseInt(req.params.id);


        const query = buildSelectQuery({
            id: true,
            order_stop: true,
            journey_name: true,
            schedule: {
                select: {
                    id: true,
                    name: true
                }
            },
            _count: {
                select: {
                    bookings: true
                }
            },
            journey_stations: {
                select: {
                    train_station: {
                        select: {
                            id: true,
                            station_name: true,
                        }
                    }
                }
            },
            journay_carriages: {
                select: {
                    id: true,
                    carriage_class: {
                        select: {
                            id: true,
                            class_name: true
                        }
                    }
                }
            },
        })

        const getTrainJourney = await getTrainJourneyService(id, query);

        return res.status(200).json(HandleSuccess(getTrainJourney));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}


export const SearchTrainJourney = async (
    req: Request<{},{},{},searchStationInput['query']>,
    res:Response,
    next:NextFunction
) => {
    try{
        const searchVal:string = req.query.search || '';

        const getSearchResult = await getSearchTrainJourneyService(searchVal);

        return res.status(200).json(HandleSuccess(getSearchResult));
        
    }catch(error:any){
        next(HandleError(400, { message: error.message }))
    }
}



export const getAllJourneyStation = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const AllJourneyStation = await getAllJourneyStationService();
        return res.status(200).json(HandleSuccess(AllJourneyStation));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}

export const seed_journies_station = async (
    req:Request,
    res:Response,
    next:NextFunction
) =>{
    await prisma.journey_station.createMany({
        data:journies_station_seed
    });

    return res.status(201).send("True")
}

export const getJournyStations = async (
    req: Request<getJourneyStationInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {

        let JournyId = parseInt(req.params.id);

        const getAllStationsCoverByJourney = await getAllStationsCoverByJourneyService(JournyId);

        return res.status(200).json(HandleSuccess(getAllStationsCoverByJourney));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}

export const getJourneyStation = async (
    req: Request<getJourneyStationInput['params']>,
    res: Response,
    next: NextFunction
) => {
    try {

        let id = parseInt(req.params.id);

        const getJourneyStation = await getJourneyStationService(id);

        return res.status(200).json(HandleSuccess(getJourneyStation));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}

export const StoreJourneyStation = async (
    req: Request<{}, {}, CreateJourneyStationInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        const payload = req.body;

        const createNewJourneyStation = await newJourneyStationService(payload);

        if (!createNewJourneyStation) next(HandleError(400, { message: "Fail To Create New journey station" }));

        return res.status(201).json(HandleSuccess(createNewJourneyStation));

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}