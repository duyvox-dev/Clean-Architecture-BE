import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApiErrorMapper } from '../utils';
import { UnAuthenticated } from '../exceptions';
import { appConfig } from '../config/app.config';

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : null;

    if (!accessToken) throw new UnAuthenticated('You have not signned in yet');

    const decodedUser = jwt.verify(
      accessToken,
      appConfig.jwt.secretKeyOfAccessToken
    ) as any;
    req.userId = decodedUser.id;
    next();
  } catch (err) {
    return next(ApiErrorMapper.toErrorResponse(err, res));
  }
};
