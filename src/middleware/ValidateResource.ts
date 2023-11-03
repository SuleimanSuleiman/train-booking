import {AnyZodObject } from "zod";
import { NextFunction, Request, Response } from 'express';
import HandleError from './HandleError';

const ValidateResource = (
    Schema: AnyZodObject
) => (
    requset: Request,
    response: Response,
    next: NextFunction
 ) => {
    try {
        Schema.parse({
            body: requset.body,
            params: requset.params,
            query: requset.query
        })
        next();
    } catch (error:any) {
        next(HandleError(400, error))
    }
}

export default ValidateResource;