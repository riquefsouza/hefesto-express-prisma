import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const AuthenticateJWT = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, req.app.get('secret'), (err: any, user: any) => {
            if (err) {
                return res.sendStatus(StatusCodes.FORBIDDEN);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(StatusCodes.UNAUTHORIZED);
    }
};
