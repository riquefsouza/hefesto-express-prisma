import { StatusCodes } from 'http-status-codes';
import { AdmParameterCategory } from '@prisma/client';
import { API_ROOT, app, prisma } from '../../server';
import { AdmParameterCategoryService } from '../services/index';
import { AuthenticateJWT } from './../../base/middleware/AuthenticateJWT';

const URL: string = API_ROOT + '/admParameterCategory';

const service: AdmParameterCategoryService = new AdmParameterCategoryService(prisma);

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
    const admParameterCategory: AdmParameterCategory = req.body
    try {
        const obj = await service.insert(admParameterCategory)
        res.status(StatusCodes.CREATED).json(obj)
    } catch (error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: error })
    }
})

app.put(`${URL}/:id`, AuthenticateJWT, async (req, res) => {
    const { id } = req.params
    const admParameterCategory: AdmParameterCategory = req.body

    if (Number(id) != admParameterCategory.id) {
        return res.status(StatusCodes.BAD_REQUEST).json()
    }

    try {
        const obj = await service.update(Number(id), admParameterCategory)
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
