export const AdmParameterCategory_schema = {
    "type": "object",
    "properties": {
        "id": {
            "type": "integer",
            "format": "int64"
        },
        "description": {
            "type": "string",
            "nullable": true
        },
        "order": {
            "type": "integer",
            "format": "int64",
            "nullable": true
        }
    },
    "additionalProperties": false
}

export const AdmParameterCategory_get = {
    "security": [
        {
          "bearerAuth": []
        }
      ],  
    "tags": [
        "AdmParameterCategory"
    ],
    "responses": {
        "200": {
            "description": "Success",
            "content": {
                "text/plain": {
                    "schema": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/AdmParameterCategory"
                        }
                    }
                },
                "application/json": {
                    "schema": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/AdmParameterCategory"
                        }
                    }
                },
                "text/json": {
                    "schema": {
                        "type": "array",
                        "items": {
                            "$ref": "#/components/schemas/AdmParameterCategory"
                        }
                    }
                }
            }
        }
    }
}

export const AdmParameterCategory_post = {
    "security": [
        {
          "bearerAuth": []
        }
      ],  
    "tags": [
        "AdmParameterCategory"
    ],
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "$ref": "#/components/schemas/AdmParameterCategory"
                }
            },
            "text/json": {
                "schema": {
                    "$ref": "#/components/schemas/AdmParameterCategory"
                }
            },
            "application/*+json": {
                "schema": {
                    "$ref": "#/components/schemas/AdmParameterCategory"
                }
            }
        }
    },
    "responses": {
        "200": {
            "description": "Success",
            "content": {
                "text/plain": {
                    "schema": {
                        "$ref": "#/components/schemas/AdmParameterCategory"
                    }
                },
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/AdmParameterCategory"
                    }
                },
                "text/json": {
                    "schema": {
                        "$ref": "#/components/schemas/AdmParameterCategory"
                    }
                }
            }
        }
    }
}

export const AdmParameterCategory_getById = {
    "security": [
        {
          "bearerAuth": []
        }
      ],  
    "tags": [
        "AdmParameterCategory"
    ],
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
                "type": "integer",
                "format": "int64"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "Success",
            "content": {
                "text/plain": {
                    "schema": {
                        "$ref": "#/components/schemas/AdmParameterCategory"
                    }
                },
                "application/json": {
                    "schema": {
                        "$ref": "#/components/schemas/AdmParameterCategory"
                    }
                },
                "text/json": {
                    "schema": {
                        "$ref": "#/components/schemas/AdmParameterCategory"
                    }
                }
            }
        }
    }
}

export const AdmParameterCategory_put = {
    "security": [
        {
          "bearerAuth": []
        }
      ],  
    "tags": [
        "AdmParameterCategory"
    ],
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
                "type": "integer",
                "format": "int64"
            }
        }
    ],
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "$ref": "#/components/schemas/AdmParameterCategory"
                }
            },
            "text/json": {
                "schema": {
                    "$ref": "#/components/schemas/AdmParameterCategory"
                }
            },
            "application/*+json": {
                "schema": {
                    "$ref": "#/components/schemas/AdmParameterCategory"
                }
            }
        }
    },
    "responses": {
        "200": {
            "description": "Success"
        }
    }
}

export const AdmParameterCategory_delete = {
    "security": [
        {
          "bearerAuth": []
        }
      ],  
    "tags": [
        "AdmParameterCategory"
    ],
    "parameters": [
        {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
                "type": "integer",
                "format": "int64"
            }
        }
    ],
    "responses": {
        "200": {
            "description": "Success"
        }
    }
}