import { NextFunction, Request, Response } from 'express';
import { storeBookingInput, storeBookingStatusInput } from '../Schemas/booking.shema';
import { getAllStatusBookingService, storeNewBookingService, storeNewStatusBookingService } from '../services/booking.service';
import { HandleSuccess } from '../middleware/HandleSuccess';
import HandleError from '../middleware/HandleError';


export const storeNewStatusBooking = async (
    req: Request<{}, {}, storeBookingStatusInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {
        let payload = req.body;

        const NewjourneyCarriage = await storeNewStatusBookingService(payload);

        return res.status(201).json(HandleSuccess(NewjourneyCarriage))

    } catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}

export const getAllStatusBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let getAllStatusBooking = await getAllStatusBookingService();

        return res.status(200).json(HandleSuccess(getAllStatusBooking));
    }
    catch (error: any) {
        next(HandleError(400, { message: error.message }))
    }
}

export const storeBooking = async (
    req: Request<{}, {}, storeBookingInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {

        let payload = req.body;

        const storeBooking = await storeNewBookingService(payload);

        return res.status(201).json(HandleSuccess(storeBooking))

    } catch (error: any) {
        let message;
        if(error.code ===  "P2025"){
            message =  "An operation failed because it depends on one or more records that were required but not found. {cause}"
        }else{
            message = error.message
        }
        next(HandleError(400, { message:message }))
    }
}