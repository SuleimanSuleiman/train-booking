import {Request,Response,NextFunction} from "express";
import HandleError from "../middleware/HandleError";
import { storeCarriageClassInput, storeCarriagePriceInput, storeNewjourneyCarriageInput } from "../Schemas/carriage.Schema";
import { NewjourneyCarriageService, getAllCarriageClassService, getAllCarriagePriceService, getAllJourneyCarriageServie, newCarriageClassService, newCarriagePriceService } from "../services/carriage.service";
import { HandleSuccess } from "../middleware/HandleSuccess";
import Cache from "node-cache";
import prisma from "../lib/prisma";
import { journey_carriage_seed } from "../seeders/seed";

const cache = new Cache();

export const  seedJourneyCarriage = async (
    req:Request,
    res:Response,
    next:NextFunction
) =>{
    await prisma.journay_carriage.createMany({
        data:journey_carriage_seed
    });

    return res.status(201).send("True")
}

export const storeNewCarriageClass = async (
    req:Request<{},{},storeCarriageClassInput['body']>,
    res: Response,
    next:NextFunction
) => {
    try{
        const payload = req.body;

        const newCarriageClass = await newCarriageClassService(payload);

        return res.status(201).json(HandleSuccess(newCarriageClass))

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const getAllCarriageClass = async (
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
            let AllCarriageClass = await getAllCarriageClassService();
            console.log(`Caching response: ${key}`);
            cache.set(key, AllCarriageClass);
            return res.status(200).json(HandleSuccess(AllCarriageClass));
        }

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}


export const storeCarriagePrice =  async (
    req:Request<{},{},storeCarriagePriceInput['body']>,
    res: Response,
    next:NextFunction
) => {
    try{
        const payload = req.body;

        const newCarriageClass = await newCarriagePriceService(payload);

        return res.status(201).json(HandleSuccess(newCarriageClass))

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const getAllCarriagePrice = async (
      req:Request,
    res:Response,
    next:NextFunction
) => {
    try{
        let AllCarriagePrice = await getAllCarriagePriceService();

        return res.status(200).json(HandleSuccess(AllCarriagePrice));
    }
    catch(error:any){
    next(HandleError(400, {message: error.message}))
    }
}


export const storeNewjourneyCarriage = async (
    req:Request<{},{},storeNewjourneyCarriageInput['body']>,
    res: Response,
    next:NextFunction
) => {
    try{
        let payload = req.body;

        const NewjourneyCarriage = await NewjourneyCarriageService(payload);

        return res.status(201).json(HandleSuccess(NewjourneyCarriage))

    }catch(error:any){
        next(HandleError(400, {message: error.message}))
    }
}

export const getAllJourneyCarriage = async (
    req:Request,
    res:Response,
    next:NextFunction
) => {
    try{
        let getAllJourneyCarriage = await getAllJourneyCarriageServie();

        return res.status(200).json(HandleSuccess(getAllJourneyCarriage));
    }
    catch(error:any){
    next(HandleError(400, {message: error.message}))
    }
}