export const AdmMenu_schema = {
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
      "idMenuParent": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      },
      "idPage": {
        "type": "integer",
        "format": "int64",
        "nullable": true
      },
      "order": {
        "type": "integer",
        "format": "int32",
        "nullable": true
      },
      "admPage": {
        "$ref": "#/components/schemas/AdmPage"
      },
      "admMenuParent": {
        "$ref": "#/components/schemas/AdmMenu"
      }
    },
    "additionalProperties": false
}

export const AdmMenu_get = {
    "security": [
      {
        "bearerAuth": []
      }
    ],
    "tags": [
      "AdmMenu"
    ],
    "responses": {
      "200": {
        "description": "Success",
        "content": {
          "text/plain": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/AdmMenu"
              }
            }
          },
          "application/json": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/AdmMenu"
              }
            }
          },
          "text/json": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/AdmMenu"
              }
            }
          }
        }
      }
    }
}

export const AdmMenu_post = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmMenu"
  ],
  "requestBody": {
    "content": {
      "application/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmMenu"
        }
      },
      "text/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmMenu"
        }
      },
      "application/*+json": {
        "schema": {
          "$ref": "#/components/schemas/AdmMenu"
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
            "$ref": "#/components/schemas/AdmMenu"
          }
        },
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmMenu"
          }
        },
        "text/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmMenu"
          }
        }
      }
    }
  }
}

export const AdmMenu_getById = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
      "AdmMenu"
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
              "$ref": "#/components/schemas/AdmMenu"
            }
          },
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/AdmMenu"
            }
          },
          "text/json": {
            "schema": {
              "$ref": "#/components/schemas/AdmMenu"
            }
          }
        }
      }
    }
}

export const AdmMenu_put = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmMenu"
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
          "$ref": "#/components/schemas/AdmMenu"
        }
      },
      "text/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmMenu"
        }
      },
      "application/*+json": {
        "schema": {
          "$ref": "#/components/schemas/AdmMenu"
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

export const AdmMenu_delete = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmMenu"
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