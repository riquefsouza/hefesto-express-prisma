export const AdmProfile_schema = {
    "type": "object",
    "properties": {
      "id": {
        "type": "integer",
        "format": "int64"
      },
      "administrator": {
        "type": "string",
        "nullable": true
      },
      "description": {
        "type": "string",
        "nullable": true
      },
      "general": {
        "type": "string",
        "nullable": true
      },
      "admPages": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/AdmPage"
        },
        "nullable": true
      },
      "admUsers": {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/AdmUser"
        },
        "nullable": true
      },
      "profilePages": {
        "type": "string",
        "nullable": true
      },
      "profileUsers": {
        "type": "string",
        "nullable": true
      }
    },
    "additionalProperties": false
}
export const MenuItemDTO_schema = {
  "type": "object",
  "properties": {
    "label": {
      "type": "string",
      "nullable": true
    },
    "routerLink": {
      "type": "string",
      "nullable": true
    },
    "url": {
      "type": "string",
      "nullable": true
    },
    "to": {
      "type": "string",
      "nullable": true
    },
    "item": {
      "type": "array",
      "items": {
        "$ref": "#/components/schemas/MenuItemDTO"
      },
      "nullable": true
    }
  },
  "additionalProperties": false
}

export const AdmProfile_get = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
    "tags": [
      "AdmProfile"
    ],
    "responses": {
      "200": {
        "description": "Success",
        "content": {
          "text/plain": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/AdmProfile"
              }
            }
          },
          "application/json": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/AdmProfile"
              }
            }
          },
          "text/json": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/AdmProfile"
              }
            }
          }
        }
      }
    }
}

export const AdmProfile_post = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmProfile"
  ],
  "requestBody": {
    "content": {
      "application/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmProfile"
        }
      },
      "text/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmProfile"
        }
      },
      "application/*+json": {
        "schema": {
          "$ref": "#/components/schemas/AdmProfile"
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
            "$ref": "#/components/schemas/AdmProfile"
          }
        },
        "application/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmProfile"
          }
        },
        "text/json": {
          "schema": {
            "$ref": "#/components/schemas/AdmProfile"
          }
        }
      }
    }
  }
}

export const AdmProfile_getById = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
    "tags": [
      "AdmProfile"
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
              "$ref": "#/components/schemas/AdmProfile"
            }
          },
          "application/json": {
            "schema": {
              "$ref": "#/components/schemas/AdmProfile"
            }
          },
          "text/json": {
            "schema": {
              "$ref": "#/components/schemas/AdmProfile"
            }
          }
        }
      }
    }
}

export const AdmProfile_put = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmProfile"
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
          "$ref": "#/components/schemas/AdmProfile"
        }
      },
      "text/json": {
        "schema": {
          "$ref": "#/components/schemas/AdmProfile"
        }
      },
      "application/*+json": {
        "schema": {
          "$ref": "#/components/schemas/AdmProfile"
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

export const AdmProfile_delete = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmProfile"
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

export const AdmProfile_mountMenu = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
    "tags": [
      "AdmProfile"
    ],
    "parameters": [
      {
        "in": "body",
        "name": "listaIdProfile",
        "description": "listaIdProfile",
        "required": true,
        "schema": {
          "type": "array",
          "items": {
            "type": "integer",
            "format": "int64"
          }
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Success",
        "content": {
          "text/plain": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/MenuItemDTO"
              }
            }
          },
          "application/json": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/MenuItemDTO"
              }
            }
          },
          "text/json": {
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/components/schemas/MenuItemDTO"
              }
            }
          }
        }
      }
    }
}

export const AdmProfile_findProfilesByPage = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmProfile"
  ],
  "parameters": [
    {
      "name": "pageId",
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
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmProfile"
            }
          }
        },
        "application/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmProfile"
            }
          }
        },
        "text/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmProfile"
            }
          }
        }
      }
    }
  }
}

export const AdmProfile_findProfilesByUser = {
  "security": [
    {
      "bearerAuth": []
    }
  ],
  "tags": [
    "AdmProfile"
  ],
  "parameters": [
    {
      "name": "userId",
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
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmProfile"
            }
          }
        },
        "application/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmProfile"
            }
          }
        },
        "text/json": {
          "schema": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/AdmProfile"
            }
          }
        }
      }
    }
  }
}