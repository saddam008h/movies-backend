import { JwtPayload, verify } from 'jsonwebtoken';
import express from 'express';

interface AuthenticatedRequest extends express.Request {
  user: string | JwtPayload;
  token: string;
}

const validateToken = (req: AuthenticatedRequest, res: express.Response, next: express.NextFunction) => {
  try {
    const accessToken = req.header('Authorization').split(' ')[1];
    console.log(accessToken);

    if (!accessToken) {
      return res.sendStatus(401);
    }

    // Verify the token and extract the payload
    const payload = verify(accessToken, process.env.JWTPRIVATEKEY);

    // Attach the payload and token to the request object
    req.user = payload;
    req.token = accessToken;

    // Proceed to the next middleware or route handler
    return next();
  } catch (err) {
    return res.sendStatus(401);
  }
};

export default validateToken;
