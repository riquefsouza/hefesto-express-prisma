export const AdmUser_schema = {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "active": {
        "type": "string",
        "nullable": true
      },
      "email": {
        "type": "string",
        "nullable": true
      },
      "login": {
        "type": "string",
        "nullable": true
      },
      "name": {
        "type": "string",
        "nullable": true
      },
      "password": {
        "type": "string",
        "nullable": true
      },
      "admIdProfiles": {
        "type": "array",
        "items": {
          "type": "integer",
          "format": "int64"
        },
        "nullable": true
      },
      "userProfiles": {
        "type": "string",
        "nullable": true
      },
      "currentPassword": {
        "type": "string",
        "nullable": true
      },
      "newPassword": {
        "type": "string",
        "nullable": true
      },
      "confirmNewPassword": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
}

export const AdmUser_get = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmUser"
  ],
  "responses": {
    "200": {
      "description": "Success",
      "content": {
        "text/plain": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmUser"
            }
          }
        },
        "application/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmUser"
            }
          }
        },
        "text/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmUser"
            }
          }
        }
      }
    }
  }
}

export const AdmUser_post = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmUser"
  ],
  "requestBody": {
    "content": {
      "application/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmUser"
        }
      },
      "text/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmUser"
        }
      },
      "application/*+json": {
        "schema": {
          "$ref": "#/components/schemas/AdmUser"
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
            "$ref": "#/components/schemas/AdmUser"
          }
        },
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmUser"
          }
        },
        "text/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmUser"
          }
        }
      }
    }
  }
}

export const AdmUser_getById = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmUser"
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
            "$ref": "#/components/schemas/AdmUser"
          }
        },
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmUser"
          }
        },
        "text/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmUser"
          }
        }
      }
    }
  }
}

export const AdmUser_put = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmUser"
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
          "$ref": "#/components/schemas/AdmUser"
        }
      },
      "text/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmUser"
        }
      },
      "application/*+json": {
        "schema": {
          "$ref": "#/components/schemas/AdmUser"
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

export const AdmUser_delete = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmUser"
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