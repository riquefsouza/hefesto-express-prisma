import { PrismaClient } from '@prisma/client'
import express from 'express'
//import cors from 'cors';
import swaggerUi from 'swagger-ui-express'
import { swaggerDocument } from './base/openAPI/swagger'

export const API_ROOT: string = '/api/v1'
export const prisma = new PrismaClient()
export const app = express()

app.use(express.json())
/*
const corsOptions = {
  exposedHeaders: ['x-access-token']
};
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
*/

app.set('secret', 'rm!@N=Ke!~p8VTA2ZRK~nMDQX5Uvm!mD&]{@Vr?G;2?XhbC:Qa#9#eMLN\\}x3?JR3.2zr~v)gYF^8\\:8>:XfB:Ww75N/emt9Yj[bQMNCWwW\\J?N,nvH.<2\\.r~w]*e~vgak)X"v8H`MH/7"2E`,^k@n<vE-wD3g9JWPy;CrY*.Kd2_D])=><D?YhBaSua5hW%{2]_FVXzb9`8FH^b[X3jzVER&:jw2<=c38=>L/zBq`}C6tT*cCSVC^c]-L}&/');

//http://localhost:3000/api-docs/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use((req, res, next) => {
  const token = req.headers['Authorization'];
  if(token) {
      console.log('A token is send by the application, Token value is ' + token);
  }
  next();
});

import './base/controllers/LoginController'
import './admin/controllers/AdmParameterCategoryController'
import './admin/controllers/AdmMenuController'
import './admin/controllers/AdmPageController'
import './admin/controllers/AdmParameterController'
import './admin/controllers/AdmProfileController'
import './admin/controllers/AdmUserController'

app.use('*', (req, res) => {
  res.status(404).json({ message: `route ${req.originalUrl} does not exists!` });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const server = app.listen(3000, () => {
    console.log('Server ready at: http://localhost:3000');
});


/*
datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:abcd1234@localhost:5432/dbhefesto?schema=public"
}
*/
