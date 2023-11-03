import { Request, Response, NextFunction } from "express";
import { VerifyJWT, HandleRefreshToken } from '../services/session.service';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies['access-token']

  const refreshToken = req.cookies['refresh-token']


  if (accessToken && req.url == '/users/register') {
    return res.redirect('/')
  }

  if (!accessToken) {
    return next();
  }

  const { decoded, expired } = await VerifyJWT(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await HandleRefreshToken({ refreshToken });

    if (newAccessToken) {
      res.cookie("access-token", newAccessToken);
    }

    const result = await VerifyJWT(newAccessToken as string);

    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
