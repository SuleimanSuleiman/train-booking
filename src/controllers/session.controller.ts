import { createSession, signJwt } from '../services/session.service';
import prisma from '../lib/prisma';

interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}


export const CreateSessionHandle = async (user:any):Promise<SessionTokens>=> {
    
    const newSession = await createSession(user.id)

    const accessToken:string = signJwt(
        {...user,sessionId:newSession.id},
        {expiresIn: process.env.ACCESS_TOKEN}
    );

    const refreshToken:string = signJwt(
        { ...user, sessionId: newSession.id },
        {expiresIn: process.env.REFRESH_TOKEN}
    )

    return {
        accessToken,
        refreshToken
    }
}

export const GetSessionHandle = (userId:number) => {
    return prisma.session.findFirstOrThrow({
        where: {
            userId:userId
        }
    })
}