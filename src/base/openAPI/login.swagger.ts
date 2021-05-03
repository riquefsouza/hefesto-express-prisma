export const LoginForm_schema = {
    "type": "object",
    "properties": {
      "login": {
        "type": "string",
        "nullable": false
      },
      "password": {
        "type": "string",
        "nullable": false
      }
    },
    "additionalProperties": false
}

export const Login_auth = {
    "tags": [
        "Token"
    ],
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    "$ref": "#/components/schemas/LoginForm"
                }
            },
            "text/json": {
                "schema": {
                    "$ref": "#/components/schemas/LoginForm"
                }
            },
            "application/*+json": {
                "schema": {
                    "$ref": "#/components/schemas/LoginForm"
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
