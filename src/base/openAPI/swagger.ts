import { getAdmParameterCategory } from '../../admin/openAPI/admParameterCategory.swagger';

export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Hefesto Express Prisma APIs',
        description: 'Hefesto Express Prisma APIs',
        termsOfService: 'Hefesto Express Prisma APIs',
        contact: {
            name: 'Henrique Figueiredo de Souza'
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        }
    },
    servers: [
        {
            url: 'http://localhost:3000/api/v1',
            description: 'Local server'
        },
    ],
    tags: [
        {
            name: 'AdmParameterCategory'
        }
    ],
    paths: {
        "/admParameterCategory": {
            "get": getAdmParameterCategory
        }
    }    
}