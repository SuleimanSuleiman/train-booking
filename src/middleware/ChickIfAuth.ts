import {Request,Response, NextFunction} from 'express';
import HandleError from './HandleError';

async function ChickIfAuth(
    req: Request,
    res: Response,
    next:NextFunction
) {
    try {
        const user = res.locals.user;
        if (!user) next(HandleError(403, { message: "Access dined" }))
        return next()
    } catch (error: any) {
        next(HandleError(400,{message:error.message}))
    }
}


export default ChickIfAuth;