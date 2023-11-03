import prisma from "../lib/prisma"
import jwt from 'jsonwebtoken';

export const createSession = async (userId: number) => {
    const session = await prisma.session.create({ data: { userId: userId } })
    return session;
}

export const signJwt = (
    object: Record<string, unknown>,
    options?: jwt.SignOptions | undefined,
):string => {
    return jwt.sign(object,process.env.PRIVATE_KEY ||"suleimansuleiman", {
        ...(options && options),
        algorithm:"HS512"
    });
}

export const VerifyJWT = async (
    token:string
) => {
    try {
    const s:string = process.env.PRIVATE_KEY ?? "unkwon";
    const decoded = jwt.verify(token, s);
    return {
        decoded,
        valid: true,
        expired:false
    }  
    } catch (error: any) {
        return {
            decoded: false,
            valid: false,
            expired: error.message === "jwt expired",
        }
    }
}

export const HandleRefreshToken = async ({
  refreshToken,
}: {
  refreshToken: string;
  }) =>{
  
  const { decoded } = await VerifyJWT(refreshToken);

    //@ts-ignore
    if (!decoded || !decoded.sessionId) return false;
    
    const session = await prisma.session.findUniqueOrThrow({
        where: {
          //@ts-ignore
          id: decoded.sessionId
      }
  })

  if (!session) return false;

    const user = await prisma.user.findUnique({
        where: {
          id:session.userId
      }
  })

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: process.env.ACCESS_TOKEN}
  );

  return accessToken;
}