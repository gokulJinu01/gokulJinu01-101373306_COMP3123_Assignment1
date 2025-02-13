# COMP 3123 - Full Stack Development - I

## Description
This is COMP 3123 - Assignment 1 created with with Node.js, Express, and MongoDB to manage user and employee data.

## Features
- User Registration
- User Login
- Employee CRUD Operations

## Setup
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Ensure MongoDB is running.
4. Start the server with `npm start`. (changed in the package.json)

## API Endpoints
### User Management
- `POST /api/v1/user/signup`: Create a new user account.
- `POST /api/v1/user/login`: Login to the system.

### Employee Management
- `GET /api/v1/emp/employees`: Retrieve all employees.
- `POST /api/v1/emp/employees`: Create a new employee.
- `GET /api/v1/emp/employees/{eid}`: Retrieve employee details by ID.
- `PUT /api/v1/emp/employees/{eid}`: Update employee details.
- `DELETE /api/v1/emp/employees?eid={eid}`: Delete employee by ID.

