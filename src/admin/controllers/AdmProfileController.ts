import { StatusCodes } from 'http-status-codes';
import { AdmProfile } from '@prisma/client';
import { API_ROOT, app, prisma } from '../../server';
import { AdmProfileService } from '../services/index';
import { AuthenticateJWT } from './../../base/middleware/AuthenticateJWT';

const URL: string = API_ROOT + '/admProfile';

const service: AdmProfileService = new AdmProfileService(prisma);

app.get(URL, AuthenticateJWT, async (req, res) => {
    const list = await service.findAll()
    res.status(StatusCodes.OK).json(list)
});

app.get(`${URL}/:id`, AuthenticateJWT, async (req, res) => {
    const { id }: { id?: number } = req.params
    const obj = await service.findById(Number(id))
    if (obj == null) {
        res.status(StatusCodes.NOT_FOUND).json()
    } else {
        res.status(StatusCodes.OK).json(obj)
    }
})

app.post(URL, AuthenticateJWT, async (req, res) => {
    const admProfile: AdmProfile = req.body
    try {
        const obj = await service.insert(admProfile)
        res.status(StatusCodes.CREATED).json(obj)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: error })
    }
})

app.put(`${URL}/:id`, AuthenticateJWT, async (req, res) => {
    const { id } = req.params
    const admProfile: AdmProfile = req.body

    if (Number(id) != admProfile.id) {
        return res.status(StatusCodes.BAD_REQUEST).json()
    }

    try {
        const obj = await service.update(Number(id), admProfile)
        res.status(StatusCodes.OK).json(obj)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json()
            .json({ error: `Parameter Category with ID ${id} does not exist in the database` })
    }
})

app.delete(`${URL}/:id`, AuthenticateJWT, async (req, res) => {
    const { id } = req.params

    try {
        const obj = await service.findById(Number(id))
        if (obj == null) {
            res.status(StatusCodes.NOT_FOUND).json()
        } else {    
            const obj = await service.delete(Number(id))
            res.status(StatusCodes.OK).json(obj)
        }
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND)
            .json({ error: `Parameter Category with ID ${id} does not exist in the database` })
    }
})

app.get(`${URL}/findProfilesByPage/:pageId`, AuthenticateJWT, async (req, res) => {
    const { pageId }: { pageId?: number } = req.params
    const list = await service.findProfilesByPage(Number(pageId));
    res.status(StatusCodes.OK).json(list)
})

app.get(`${URL}/findProfilesByUser/:userId`, AuthenticateJWT, async (req, res) => {
    const { userId }: { userId?: number } = req.params
    const list = await service.findProfilesByUser(Number(userId));
    res.status(StatusCodes.OK).json(list)
})
