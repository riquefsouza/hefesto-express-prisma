export const AdmPage_schema = {
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
      "url": {
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
      "pageProfiles": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
}

export const AdmPage_get = {
  "tags": [
    "AdmPage"
  ],
  "responses": {
    "200": {
      "description": "Success",
      "content": {
        "text/plain": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmPage"
            }
          }
        },
        "application/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmPage"
            }
          }
        },
        "text/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmPage"
            }
          }
        }
      }
    }
  }
}

export const AdmPage_post = {
  "tags": [
    "AdmPage"
  ],
  "requestBody": {
    "content": {
      "application/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmPage"
        }
      },
      "text/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmPage"
        }
      },
      "application/*+json": {
        "schema": {
          "$ref": "#/components/schemas/AdmPage"
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
            "$ref": "#/components/schemas/AdmPage"
          }
        },
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmPage"
          }
        },
        "text/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmPage"
          }
        }
      }
    }
  }
}

export const AdmPage_getById = {
    "tags": [
      "AdmPage"
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
              "$ref": "#/components/schemas/AdmPage"
            }
          },
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/AdmPage"
            }
          },
          "text/json": {
            "schema": {
              "$ref": "#/components/schemas/AdmPage"
            }
          }
        }
      }
    }
}

export const AdmPage_put = {
  "tags": [
    "AdmPage"
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
          "$ref": "#/components/schemas/AdmPage"
        }
      },
      "text/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmPage"
        }
      },
      "application/*+json": {
        "schema": {
          "$ref": "#/components/schemas/AdmPage"
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

export const AdmPage_delete = {
  "tags": [
    "AdmPage"
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