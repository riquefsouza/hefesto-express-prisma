export const AdmParameter_schema = {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "code": {
        "type": "string",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "value": {
        "type": "string",
        "nullable": true
      },
      "admParameterCategory": {
        "$ref": "#/components/schemas/AdmParameterCategory"
      }
    },
    "additionalProperties": false
}

export const AdmParameter_get = {
  "tags": [
    "AdmParameter"
  ],
  "responses": {
    "200": {
      "description": "Success",
      "content": {
        "text/plain": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmParameter"
            }
          }
        },
        "application/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmParameter"
            }
          }
        },
        "text/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmParameter"
            }
          }
        }
      }
    }
  }
}

export const AdmParameter_post = {
  "tags": [
    "AdmParameter"
  ],
  "requestBody": {
    "content": {
      "application/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmParameter"
        }
      },
      "text/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmParameter"
        }
      },
      "application/*+json": {
        "schema": {
          "$ref": "#/components/schemas/AdmParameter"
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
            "$ref": "#/components/schemas/AdmParameter"
          }
        },
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmParameter"
          }
        },
        "text/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmParameter"
          }
        }
      }
    }
  }
}

export const AdmParameter_getById = {
    "tags": [
      "AdmParameter"
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
              "$ref": "#/components/schemas/AdmParameter"
            }
          },
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/AdmParameter"
            }
          },
          "text/json": {
            "schema": {
              "$ref": "#/components/schemas/AdmParameter"
            }
          }
        }
      }
    }
}

export const AdmParameter_put = {
  "tags": [
    "AdmParameter"
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
          "$ref": "#/components/schemas/AdmParameter"
        }
      },
      "text/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmParameter"
        }
      },
      "application/*+json": {
        "schema": {
          "$ref": "#/components/schemas/AdmParameter"
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

export const AdmParameter_delete = {
  "tags": [
    "AdmParameter"
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