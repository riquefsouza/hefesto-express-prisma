import { PrismaClient } from '@prisma/client'
import express from 'express'
//import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './base/openAPI/swagger'

export const API_ROOT: string = '/api/v1'
export const prisma = new PrismaClient()
export const app = express()

app.use(express.json())
//app.use(cors(corsOptions))
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true}))
//http://localhost:3000/api-docs/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


import './admin/controllers/AdmParameterCategoryController'
import './admin/controllers/AdmMenuController'
import './admin/controllers/AdmPageController'
import './admin/controllers/AdmParameterController'
import './admin/controllers/AdmProfileController'
import './admin/controllers/AdmUserController'

const server = app.listen(3000, () => {
    console.log('Server ready at: http://localhost:3000');
});


/*
datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:abcd1234@localhost:5432/dbhefesto?schema=public"
}
*/
