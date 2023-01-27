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
    "email": "newuser123@thiscompany.com"
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
    "message": "User with username 'newuser123' already exists, please choose another username."
    ```
- Headers
    - Content-Type: applications/json

3. Unsuccessful registration because user with the given email already exists
- Status Code
    - 400 Bad Request
- Body
    ```JSON
     "message": "User with the email 'newuser123@thiscompany.com' already exists.`
    ```
- Headers
    - Content-Type: applications/json

4. Unsuccessful registration because invalid company email
- Status Code
    - 400 Bad Request
- Body
    ```JSON
     "message": "'newuser123@Notthiscompany.com' is not a valid company email`"
    ```
- Headers
    - Content-Type: applications/json

5. Invalid registration input
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "Invalid registration input."
    ```
- Headers
    - Content-Type: applications/json

## Submit Reimbursement Ticket Endpoint (Role: Employee)
### Request
- HTTP Method
    - POST
- URL
    - /tickets/submit
- Headers
    - Content-Type: application/json
- Body
    ```JSON
    "amount": 11.25
    "description": "Client dinner"
    "type": "food"
    ```
### Response Scenarios
1. Succuessful reimbursement ticket submission
- Status Code
    - 200 OK
- Body
    ```JSON
    "message": "Ticket succuessfully submitted!"
    ```
- Headers
    - Content-Type: applications/json

2. Inavlid reimbursement ticket submission, beacuse you do not have the role of 'employee'
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "You do not have the appropriate role of 'employee' to access this operation"
    ```
- Headers
    - Content-Type: applications/json

3. Invalid reimbursement ticket submission input
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "Invalid reimbursement ticket input"
    ```
- Headers
    - Content-Type: applications/json
## View Reimbursement Tickets Endpoint (Role: Manager)
### Request
- HTTP Method
    - GET
- URL
    - /tickets/manager-view
- Headers
    - Content-Type: application/json
- Body
   - N/A
### Response Scenarios
1. Successful query of tickets by status (approved, pending, or denied)
- Status Code
    - 200 OK
- Body
    ```JSON
     {
        "ticket_id": "abc123",
        "ticket_status": "approved",
        "amount": 98,
        "description": "client dinner",
        "employee_username": "abc123",
        "type": "food"
    },
    {
        "ticket_id": "a23ef73c-2648-426c-b45a-49c5be0a23df",
        "ticket_status": "approved",
        "amount": 98,
        "description": "client dinner",
        "employee_username": "user123",
        "type": "food"
    }
    ```
- Headers
    - Content-Type: applications/json

2. Successfully view all tickets, no query requested
- Status Code
    - 200 OK
- Body
    ```JSON
      {
        "ticket_id": "abc123",
        "ticket_status": "approved",
        "amount": 98,
        "description": "client dinner",
        "employee_username": "abc123",
        "type": "food"
    },
    {
        "ticket_id": "12",
        "ticket_status": "denied",
        "amount": 98,
        "description": "client dinner",
        "employee_username": "user123",
        "type": "travel"
    },
    {
        "ticket_id": "a23ef73c-2648-426c-b45a-49c5be0a23df",
        "ticket_status": "approved",
        "amount": 98,
        "description": "client dinner",
        "employee_username": "user123",
        "type": "food"
    }
    ```
- Headers
    - Content-Type: applications/json

3. Authentication verification error
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "Please login first."
    ```
- Headers
    - Content-Type: applications/json
## View Reimbursement Tickets Endpoint (Role: Employee, with username: abc123)
### Request
- HTTP Method
    - GET
- URL
    - /tickets/employee-view
- Headers
    - Content-Type: application/json
- Body
   - N/A
### Response Scenarios
1. Successful query of tickets by category (food, travel, etc.)
- Status Code
    - 200 OK
- Body
    ```JSON
     {
        "ticket_id": "23",
        "ticket_status": "approved",
        "amount": 98,
        "description": "client dinner",
        "employee_username": "abc123",
        "type": "food"
    },
    {
        "ticket_id": "a23ef73c-2648-426c-b45a-49c5be0a23df",
        "ticket_status": "approved",
        "amount": 98,
        "description": "client dinner",
        "employee_username": "abc123",
        "type": "food"
    }
    ```
- Headers
    - Content-Type: applications/json

2. Successfully view all tickets (associated to your username), no query requested
- Status Code
    - 200 OK
- Body
    ```JSON
      {
        "ticket_id": "abc123",
        "ticket_status": "approved",
        "amount": 98,
        "description": "client dinner",
        "employee_username": "abc123",
        "type": "food"
    },
    {
        "ticket_id": "12",
        "ticket_status": "denied",
        "amount": 98,
        "description": "client dinner",
        "employee_username": "abc123",
        "type": "travel"
    },
    {
        "ticket_id": "a23ef73c-2648-426c-b45a-49c5be0a23df",
        "ticket_status": "approved",
        "amount": 98,
        "description": "client dinner",
        "employee_username": "abc123",
        "type": "food"
    }
    ```
- Headers
    - Content-Type: applications/json

3. Authentication verification error
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "You do not have the appropriate role of 'employee' to access this operation"
    ```
- Headers
    - Content-Type: applications/json

4. Server error
- Status Code
    - 500 Bad Request
- Body
    ```JSON
    "message": "You do not have the appropriate role of 'employee' to access this operation"
    ```
- Headers
    - Content-Type: applications/json

## PROCESS PENDING TICKETS (Role: Manager)
### Request
- HTTP Method
    - PATCH
- URL
    - /tickets/process
- Headers
    - Content-Type: application/json
- Body
    ```JSON
    {
    "ticket_id": "e232074f-c5cf-4d91-9038-fc75e1375f10",
    "ticket_status": "approved"
    }
    ```
### Response Scenarios
1. Successful approve or deny a pending ticket
- Status Code
    - 200 OK
- Body
    ```JSON
     "message": "approved ticket with ID: e232074f-c5cf-4d91-9038-fc75e1375f10"
    ```
- Headers
    - Content-Type: applications/json

2. Failed processing ticket because ticket has already been approved or denied
- Status Code
    - 400 Bad Request
- Body
    ```JSON
      "message": "Ticket with ID: e232074f-c5cf-4d91-9038-fc75e1375f10  has already been approved or denied"
    ```
- Headers
    - Content-Type: applications/json

3. Invalid role error
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "You do not have the appropriate role of 'manager' to access this operation"
    ```
- Headers
    - Content-Type: applications/json
## CHANGE ROLES (Role: Manager)
### Request
- HTTP Method
    - PATCH
- URL
    - /:username/role
- Headers
    - Content-Type: application/json
- Body
    ```JSON
    {
    "role": "manager"
    }
    ```
### Response Scenarios
1. Succuessfully changed user role
- Status Code
    - 200 OK
- Body
    ```JSON
     "message": "Successfully changed user abc123 role to manager`
    ```
- Headers
    - Content-Type: applications/json

2. Invailid user with specified usernmae
    - 400 Bad Request
- Body
    ```JSON
      "message": "User with username: def456 does not exist"
    ```
- Headers
    - Content-Type: applications/json

3. Server error
- Status Code
    - 400 Bad Request
- Body
    ```JSON
    "message": "err"
    ```
- Headers
    - Content-Type: applications/json
