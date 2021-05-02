import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import { AdmParameterCategoryController } from './controllers/AdmParameterCategoryController'

export const prisma = new PrismaClient()
export const app = express()

app.use(express.json())

const admParameterCategoryController = new AdmParameterCategoryController(app, prisma)

admParameterCategoryController.findAll()

const server = app.listen(3000, () => {
    console.log('Server ready at: http://localhost:3000');
});
