# Foundations Project
## Startup
To start...
## Endpoints
## Login Endpoint
### Request
- HTTP Method
    - POST
- URL
    - /login
- Headers
    - Content-Type: application/json
- Body
    ```JSON
    "username": "user123"
    "password": "password"
    ```
### Response Scenarios
1. Valid username and password provided in request body
- Status Code
    - 200 OK
- Body
    ```JSON
    "message": "succuessful login"
    "token": "password"
    ```
- Headers
    - Content-Type: applications/json

2. Invalid username
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "User with username user123 does not exist"
    ```
- Headers
    - Content-Type: applications/json

3. Invalid Password, valid username
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "Invalid password"
    ```
- Headers
    - Content-Type: applications/json
## Registration Endpoint
### Request
- HTTP Method
    - POST
- URL
    - /register
- Headers
    - Content-Type: application/json
- Body
    ```JSON
    "username": "newuser123"
    "password": "password"
    ```
### Response Scenarios
1. Successful registration
- Status Code
    - 201 Created
- Body
    ```JSON
    "message": "Succuessfully registered account with username newuser123"
    ```
- Headers
    - Content-Type: applications/json

2. Unsuccessful registration because username is already taken
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "User with username newuser123 already exists, please choose another username."
    ```
- Headers
    - Content-Type: applications/json

3. Invalid registration input
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "Invalid registration input."
    ```
- Headers
    - Content-Type: applications/json