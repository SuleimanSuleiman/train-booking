import {Request,Response,NextFunction} from "express";
import { StoreOREditUserInput } from "../Schemas/User.schema";


export const getStations = () => {

}

export const getStation = () =>{

}

export const storeStation = (
    req:Request<{},{},StoreOREditUserInput['body']>,
    res:Response,
    next:NextFunction
    ) =>{
    try{
        return res.json(req.body)
    }catch(error:any){

    }
}

export const updateStation = () => {

}


export const deleteStation = () =>{

}