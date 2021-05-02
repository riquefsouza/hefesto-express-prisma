import express from 'express'
import { PrismaClient } from '@prisma/client'
import { AdmParameterCategoryService } from '../services/index';


export class AdmParameterCategoryController {

    private _service: AdmParameterCategoryService;

    constructor(private app: express.Application,
        private prisma: PrismaClient) {
        this._service = new AdmParameterCategoryService();
	}

    findAll() {
        this.app.get('/admParameterCategory', async (req, res) => {
            const list = await this.prisma.admParameterCategory.findMany()
            res.json(list)
        });
    }

}