import { AdmMenu_schema, AdmMenu_get, AdmMenu_getById, AdmMenu_post, AdmMenu_put, AdmMenu_delete } 
from '../../admin/openAPI/admMenu.swagger';
import { AdmPage_schema, AdmPage_get, AdmPage_getById, AdmPage_post, AdmPage_put, AdmPage_delete }
from '../../admin/openAPI/admPage.swagger';
import { AdmParameterCategory_schema, AdmParameterCategory_get, AdmParameterCategory_getById,
    AdmParameterCategory_post, AdmParameterCategory_put, AdmParameterCategory_delete }
from '../../admin/openAPI/admParameterCategory.swagger';
import { AdmParameter_schema, AdmParameter_get, AdmParameter_getById, 
    AdmParameter_post, AdmParameter_put, AdmParameter_delete }
from '../../admin/openAPI/admParameter.swagger';
import { AdmProfile_schema, MenuItemDTO_schema, AdmProfile_get, AdmProfile_getById, 
    AdmProfile_post, AdmProfile_put, AdmProfile_delete, AdmProfile_mountMenu, AdmProfile_findProfilesByPage,
    AdmProfile_findProfilesByUser }
from '../../admin/openAPI/admProfile.swagger';
import { AdmUser_schema, AdmUser_get, AdmUser_getById, AdmUser_post, AdmUser_put, AdmUser_delete }
from '../../admin/openAPI/admUser.swagger';
import { LoginForm_schema, Login_auth } from './login.swagger';

export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Hefesto Express Prisma APIs',
        description: 'Hefesto Express Prisma APIs',
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
            description: 'API Local server'
        },
        {
            url: 'http://localhost:3000',
            description: 'Local server'
        },
    ],
    "tags": [
        {
            "name": "AdmMenu",
            "description": "Adm Menu Rest Controller"
        },
        {
            "name": "AdmPage",
            "description": "Adm Page Rest Controller"
        },
        {
            "name": "AdmParameterCategory",
            "description": "Adm Parameter Category Rest Controller"
        },
        {
            "name": "AdmParameter",
            "description": "Adm Parameter Rest Controller"
        },
        {
            "name": "AdmProfile",
            "description": "Adm Profile Rest Controller"
        },
        {
            "name": "AdmUser",
            "description": "Adm User Rest Controller"
        }
    ],
    paths: {
        "/AdmMenu": {
            "get": AdmMenu_get,
            "post": AdmMenu_post
        },
        "/AdmMenu/{id}": {
            "get": AdmMenu_getById,
            "put": AdmMenu_put,
            "delete": AdmMenu_delete
        },
        "/AdmPage": {
            "get": AdmPage_get,
            "post": AdmPage_post
        },
        "/AdmPage/{id}": {
            "get": AdmPage_getById,
            "put": AdmPage_put,
            "delete": AdmPage_delete
        },
        "/AdmParameterCategory": {
            "get": AdmParameterCategory_get,
            "post": AdmParameterCategory_post
        },
        "/AdmParameterCategory/{id}": {
            "get": AdmParameterCategory_getById,
            "put": AdmParameterCategory_put,
            "delete": AdmParameterCategory_delete
        },
        "/AdmParameter": {
            "get": AdmParameter_get,
            "post": AdmParameter_post
        },
        "/AdmParameter/{id}": {
            "get": AdmParameter_getById,
            "put": AdmParameter_put,
            "delete": AdmParameter_delete
        },
        "/AdmProfile": {
            "get": AdmProfile_get,
            "post": AdmProfile_post
        },
        "/AdmProfile/{id}": {
            "get": AdmProfile_getById,
            "put": AdmProfile_put,
            "delete": AdmProfile_delete
        },
        "/mountMenu": {
            "get": AdmProfile_mountMenu
        },
        "/findProfilesByPage/{pageId}": {
            "get": AdmProfile_findProfilesByPage
        },
        "/findProfilesByUser/{userId}": {
            "get": AdmProfile_findProfilesByUser
        },        
        "/AdmUser": {
            "get": AdmUser_get,
            "post": AdmUser_post
        },
        "/AdmUser/{id}": {
            "get": AdmUser_getById,
            "put": AdmUser_put,
            "delete": AdmUser_delete
        },
        "/auth": {
            "post": Login_auth
        }
    },
    "components": {
        "schemas": {
            "AdmMenu": AdmMenu_schema,
            "AdmPage": AdmPage_schema,
            "AdmParameterCategory": AdmParameterCategory_schema,
            "AdmParameter": AdmParameter_schema,
            "AdmProfile": AdmProfile_schema,
            "AdmUser": AdmUser_schema,
            "MenuItemDTO": MenuItemDTO_schema,
            "LoginForm": LoginForm_schema
        },
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }        
    }
}