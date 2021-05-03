import { StatusCodes } from 'http-status-codes';
import { AdmProfile } from '@prisma/client';
import { API_ROOT, app, prisma } from '../../server';
import { AdmProfileService } from '../services/index';

const URL: string = API_ROOT + '/admProfile';

const service: AdmProfileService = new AdmProfileService(prisma);

app.get(URL, async (req, res) => {
    const list = await service.findAll()
    res.status(StatusCodes.OK).json(list)
});

app.get(`${URL}/:id`, async (req, res) => {
    const { id }: { id?: number } = req.params
    const obj = await service.findById(Number(id))
    if (obj == null) {
        res.status(StatusCodes.NOT_FOUND).json()
    } else {
        res.status(StatusCodes.OK).json(obj)
    }
})

app.post(URL, async (req, res) => {
    const admProfile: AdmProfile = req.body
    try {
        const obj = await service.insert(admProfile)
        res.status(StatusCodes.CREATED).json(obj)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: error })
    }
})

app.put(`${URL}/:id`, async (req, res) => {
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

app.delete(`${URL}/:id`, async (req, res) => {
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

app.post(`${URL}/mountMenu`, async (req, res) => {
    const listaIdProfile: number[] = req.body
    return await service.mountMenuItem(listaIdProfile)
})

app.get(`${URL}/findProfilesByPage/:pageId`, async (req, res) => {
    const { pageId }: { pageId?: number } = req.params
    return await service.findProfilesByPage(pageId)
})

app.get(`${URL}/findProfilesByUser/:userId`, async (req, res) => {
    const { userId }: { userId?: number } = req.params
    return await service.findProfilesByUser(userId);
})
