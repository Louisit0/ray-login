# RAY Authentication API Documentation

## Base URL
The base URL for all API endpoints is:
http://localhost:3000

## Authentication
This API uses JSON Web Tokens (JWT) for authentication. After a successful login, a token is provided which should be included in the header of subsequent requests.

## Endpoints
Sign Up
Creates a new user account.

URL: /signup
Method: POST
Content-Type: application/json

## Request Body
name, email and password.

## Success Response

Code: 201
Content:

jsonCopy{
  "message": "Usuario registrado con éxito",
  "userId": 1
}

## Error Response

Code: 400
Content:

jsonCopy{
  "message": "Ya existe una cuenta con ese email."
}

## Login
Authenticates a user and returns a token.

URL: /login
Method: POST
Content-Type: application/json

## Request Body
email and password.

## Success Response

Code: 200
Content:

jsonCopy{
  "message": "Inicio de sesión exitoso",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

## Error Response

Code: 401
Content:

jsonCopy{
  "message": "Credenciales incorrectas"
}

## Data Model (SQLite)

Field: id, name, email, password
Type:  int, text, text, text
Description: Unique identifier (Primary Key), User's name, User's email address (Unique), User's hashed password.
