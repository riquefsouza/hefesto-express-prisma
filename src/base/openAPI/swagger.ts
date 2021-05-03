import { AdmParameterCategory_schema, AdmParameterCategory_get, AdmParameterCategory_getById, 
    AdmParameterCategory_post, AdmParameterCategory_put, AdmParameterCategory_delete } 
from '../../admin/openAPI/admParameterCategory.swagger';

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
            "get": AdmParameterCategory_get, 
            "post": AdmParameterCategory_post,
            "put": AdmParameterCategory_put, 
            "delete": AdmParameterCategory_delete
        },
        "/AdmParameterCategory/{id}": {
            "get": AdmParameterCategory_getById
        }
    },
    "components": {
        "schemas": {
            "AdmParameterCategory": AdmParameterCategory_schema
        }
    }
}