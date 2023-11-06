import {Request,Response,NextFunction} from "express";
import { CreateJourneyStationInput, CreateScheduleInput, 
    CreateStationInput, 
    CreateTrainJourneyInput,
    GetScheduleInput, 
    GetStationInput, 
    UpdataStationInput, 
    getJourneyStationInput, 
    getTrainJourneyInput } from '../Schemas/station.schema';

import { 
    getAllJourneyStationService,
    getAllSheduleService,
    getAllStationsService, 
    getAllTrainJournies, 
    getJourneyStationService, 
    getScheduleService, 
    getStationService,
    getTrainJourneyService,
    newJourneyStationService,
    newScheduleService,
    newStationService, 
    newTrainJourneyService, 
    updateStationService} from "../services/station.service";

import HandleError from "../middleware/HandleError";
import { HandleSuccess } from "../middleware/HandleSuccess";

import cacheNode from "node-cache";

const cache = new cacheNode();

export const getStations = async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
    try{
        const key = req.url;

        const cachedResponse = cache.get(key);

        if(cachedResponse) {
            console.log(`Serving from cache: ${key}`);
            return res.status(200).json(HandleSuccess(cachedResponse));
        }else{
            let allStations = await getAllStationsService();
            console.log(`Caching response: ${key}`);
            cache.set(key, allStations);
            return res.status(200).json(HandleSuccess(allStations));
        }

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const getStation = async (
    req:Request<GetStationInput['params']>,
    res:Response,
    next:NextFunction
    ) => {
    try{

        let id = parseInt(req.params.id);

        const getStation = await getStationService(id);

        return res.status(200).json(HandleSuccess(getStation));

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}
export const storeStation = async (
    req:Request<{}, {}, CreateStationInput['body']>,
    res:Response,
    next:NextFunction
    ) =>{
    try{
        const payload = req.body;

        const createNewStation = await newStationService(payload);
        
        if(!createNewStation) next(HandleError(400,{message: "Fail To Create New Station"}));

        return res.status(201).json(HandleSuccess(createNewStation));

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const updateStation =  async (
    req:Request<UpdataStationInput['params'], {}, UpdataStationInput['body']>,
    res:Response,
    next:NextFunction
    ) =>{
    try{
        const id = parseInt(req.params.id);
        const payload = req.body;

        const UpdateStation = await updateStationService(id,payload);

        return res.status(200).json(HandleSuccess(UpdateStation));

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}


export const deleteStation = () =>{

}



// schedule
export const getAllschedules =  async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
    try{
        const key = req.url;

        const cachedResponse = cache.get(key);

        if(cachedResponse) {
            console.log(`Serving from cache: ${key}`);
            return res.status(200).json(HandleSuccess(cachedResponse));
        }else{
            let allStations = await getAllSheduleService();
            console.log(`Caching response: ${key}`);
            cache.set(key, allStations);
            return res.status(200).json(HandleSuccess(allStations));
        }

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}


export const getSchedule = async (
    req:Request<GetScheduleInput['params']>,
    res:Response,
    next:NextFunction
    ) => {
    try{

        let id = parseInt(req.params.id);

        const getStation = await getScheduleService(id);

        return res.status(200).json(HandleSuccess(getStation));

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const storeSchedule =  async (
    req:Request<{}, {}, CreateScheduleInput['body']>,
    res:Response,
    next:NextFunction
    ) =>{
    try{
        const payload = req.body;

        const createNewSchedule = await newScheduleService(payload);
        
        if(!createNewSchedule) next(HandleError(400,{message: "Fail To Create New schedule"}));

        return res.status(201).json(HandleSuccess(createNewSchedule));

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const storeTrainJourney =  async (
    req:Request<{}, {}, CreateTrainJourneyInput['body']>,
    res:Response,
    next:NextFunction
    ) =>{
    try{
        const payload = req.body;

        const createNewTrainJourney = await newTrainJourneyService(payload);
        
        if(!createNewTrainJourney) next(HandleError(400,{message: "Fail To Create New schedule"}));

        return res.status(201).json(HandleSuccess(createNewTrainJourney));

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const getTrainJournies = async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
    try{
        const allTrainJournies = await getAllTrainJournies();
        return res.status(200).json(HandleSuccess(allTrainJournies));

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const getTrainJourney  = async (
    req:Request<getTrainJourneyInput['params']>,
    res:Response,
    next:NextFunction
    ) => {
    try{

        let id = parseInt(req.params.id);

        const getTrainJourney = await getTrainJourneyService(id);

        return res.status(200).json(HandleSuccess(getTrainJourney));

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const getAllJourneyStation = async (
    req:Request,
    res:Response,
    next:NextFunction
    ) => {
    try{
        const AllJourneyStation = await getAllJourneyStationService();
        return res.status(200).json(HandleSuccess(AllJourneyStation));

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const getJourneyStation = async (
    req:Request<getJourneyStationInput['params']>,
    res:Response,
    next:NextFunction
    ) => {
    try{

        let id = parseInt(req.params.id);

        const getJourneyStation = await getJourneyStationService(id);

        return res.status(200).json(HandleSuccess(getJourneyStation));

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const StoreJourneyStation = async (
    req:Request<{}, {}, CreateJourneyStationInput['body']>,
    res:Response,
    next:NextFunction
    ) =>{
    try{
        const payload = req.body;

        const createNewJourneyStation = await newJourneyStationService(payload);
        
        if(!createNewJourneyStation) next(HandleError(400,{message: "Fail To Create New journey station"}));

        return res.status(201).json(HandleSuccess(createNewJourneyStation));

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}