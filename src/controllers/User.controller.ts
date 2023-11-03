import { Request,Response,NextFunction } from "express";
import { createUserService, EditUserService, deleteUserService, GetAllDataForUser } from '../services/User.service';
import HandleError from '../middleware/HandleError';
import {omit } from "lodash";
import { StoreOREditUserInput, EditUserInput } from '../Schemas/User.schema';
import prisma from '../lib/prisma';
import bcryptjs from "bcryptjs";
import { CreateSessionHandle, GetSessionHandle } from './session.controller';
import { HandleSuccess } from "../middleware/HandleSuccess";
import { signJwt } from '../services/session.service';


export const index = async (req:Request,res:Response,next:NextFunction) => {
    try {
        const userData = res.locals.user;
        if(!userData) HandleError(403,{"message":"pleace login"})
        const user = omit(userData, ["exp", "iat", "sessionId"]);
        const userAllData = await GetAllDataForUser(user.id);
        return res.status(200).json(HandleSuccess(userAllData))
    } catch (error: any) {
        next(HandleError(400,{message:error.message}))
    }
}

export const register = async (
    req: Request<{},{},StoreOREditUserInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {

        let payload = omit(req.body, "passwordConfirmation")

        const salt = await bcryptjs.genSalt(10)

        payload.password = await bcryptjs.hash(req.body.password, salt)
        
        const user = await createUserService(payload);


        const tokens = await CreateSessionHandle(omit(user,"password"));
        
        res.cookie('access-token',tokens.accessToken)
        res.cookie('refresh-token',tokens.refreshToken)

        return res.status(201).json(user);

    } catch (error: any) {

        next(HandleError(400,{"issues":[error]}))
    }
}

export const edit = async(
    req: Request<{},{},EditUserInput['body']>,
    res: Response,
    next: NextFunction
) => {
    try {

        const userData = res.locals.user;

        if (!userData) HandleError(403, { "message": "pleace login" });

        const editUser = await EditUserService(userData.id, req.body);

        return res.json(omit(editUser,"password"))
        
    } catch (error: any) {
        next(HandleError(400,{"issues":[error]}))
    }
}

export const login = async (
    req:Request<{},{},StoreOREditUserInput['body']>,
    res: Response,
    next: NextFunction) => {
    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: req.body.email,
            }
        });

        const isCompare: boolean = await bcryptjs.compare(req.body.password, user.password)
        if (!isCompare)
            next(HandleError(403, { issues: [{ message: "Invalid Password", path: ['body', 'password'] }] }))

        const session = await GetSessionHandle(user.id);

        const accessToken:string = signJwt(
        {...user,sessionId:session.id},
        {expiresIn: process.env.ACCESS_TOKEN}
        );

        const refreshToken:string = signJwt(
            { ...user, sessionId: session.id },
            {expiresIn: process.env.REFRESH_TOKEN}
        )
        
        res.cookie('access-token',accessToken)
        res.cookie('refresh-token', refreshToken)

        res.header('session',accessToken)
        
        const { password, ...other } = user;
        
        return res.status(200).json(other)

    } catch (error: any) {
        next(HandleError(400,{"issues":[error]}))
    }
}

export const logout = (req: Request, res: Response, next: NextFunction) => {
    
    const userData = res.locals.user;

    if (!userData) HandleError(403, { "message": "pleace login" });

    res.clearCookie('access-token')
    res.clearCookie('refresh-token')
    
    return res.status(200).json(HandleSuccess({ message:"Logout Successfull"}));
}
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userData = res.locals.user;
        
        if (!userData) HandleError(403, { "message": "pleace login" });

        await deleteUserService(userData.id);

        return res.status(200).json(HandleSuccess({ message:"Deleted Succussfull"}));
    } catch (error: any) {
        next(HandleError(400,error))
    }
}

export const notExists = (req: Request, res: Response, next: NextFunction) => {
    next(HandleError(404,{message:"Not Found"}));
}