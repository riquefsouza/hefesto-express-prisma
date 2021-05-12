import { StatusCodes } from 'http-status-codes';
import { AdmMenu } from '@prisma/client';
import { API_ROOT, app, prisma } from '../../server';
import { AdmMenuService } from '../services/index';
import { AuthenticateJWT } from './../../base/middleware/AuthenticateJWT';

const URL: string = API_ROOT + '/admMenu';

const service: AdmMenuService = new AdmMenuService(prisma);

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
    const admMenu: AdmMenu = req.body
    try {
        const obj = await service.insert(admMenu)
        res.status(StatusCodes.CREATED).json(obj)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: error })
    }
})

app.put(`${URL}/:id`, AuthenticateJWT, async (req, res) => {
    const { id } = req.params
    const admMenu: AdmMenu = req.body

    if (Number(id) != admMenu.id) {
        return res.status(StatusCodes.BAD_REQUEST).json()
    }

    try {
        const obj = await service.update(Number(id), admMenu)
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

app.post(`${URL}/mountMenu`, AuthenticateJWT, async (req, res) => {
    const listaIdProfile: number[] = req.body
    const list = await service.mountMenuItem(listaIdProfile)
    res.status(StatusCodes.OK).json(list)
})
