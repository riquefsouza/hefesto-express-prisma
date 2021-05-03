import { LoginForm } from './../models/LoginForm';
import { StatusCodes } from 'http-status-codes';
import { API_ROOT, app, prisma } from '../../server';
import { AdmUserService } from '../../admin/services/AdmUserService';
import { TokenDTO } from '../models/TokenDTO';
import jwt from 'jsonwebtoken';
import { AdmUser } from '@prisma/client';

const URL: string = '/auth';

const service: AdmUserService = new AdmUserService(prisma);

app.post(URL, async (req, res) => {
    const loginForm: LoginForm = req.body

    try {
        if (loginForm != null && loginForm.login != null && loginForm.password != null){
            service.authenticate(loginForm.login, loginForm.password)
            .then((admUser: AdmUser | null) => {
                if (admUser != null){
                    const user = {
                        "id": admUser.id,
                        "name": admUser.name,
                        "email": admUser.email
                    }
            
                    console.log(`User ${loginForm.login} authenticated`);
                    console.log('Authentication Token added to response');
                    const token = jwt.sign(user, req.app.get('secret'), {
                        expiresIn: 86400 // seconds, 24h
                    });
                    //res.set('x-access-token', token);
            
                    const tokenDTO: TokenDTO = {
                        tipo: "Bearer",
                        token: token
                    };
                    res.status(StatusCodes.OK).json(tokenDTO);
                } else {
                    console.log(`Authentication failed for user ${loginForm.login}`);
                    console.log('No token generated');
                    res.status(StatusCodes.UNAUTHORIZED).json({ 
                        message: `Authentication failed for user ${loginForm.login}`});        
                    //return res.status(StatusCodes.BAD_REQUEST).json("Invalid credentials");
                }    
            });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json();
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error })
    }
})
