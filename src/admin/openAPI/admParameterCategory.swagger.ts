export const getAdmParameterCategory = {
    tags: ['AdmParameterCategory'],
    description: "Returns all Parameter Category",
    operationId: 'getAdmParameterCategory',
    security: [
        {
            bearerAuth: []
        }
    ],
    responses: {
        "200": {          
            description: "A list of Parameter Category.",
            "content": {
                "application/json": {
                    schema: {
                        type: "array",
                        items: {
                            description: {
                                type: 'string',
                                description: 'Description'
                            },
                            order: {
                                type: 'int',
                                description: 'Order'
                            }
                        }
                    }
                }
            }
        }
    }
} 