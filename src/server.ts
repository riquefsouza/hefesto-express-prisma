import { PrismaClient } from '@prisma/client'
import express from 'express'

export const API_ROOT: string = '/api/v1'
export const prisma = new PrismaClient()
export const app = express()

app.use(express.json())

import './controllers/AdmParameterCategoryController'

const server = app.listen(3000, () => {
    console.log('Server ready at: http://localhost:3000');
});


/*
datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:abcd1234@localhost:5432/dbhefesto?schema=public"
}
*/