# Node.js Client Service

## Overview

This application is a Node.js client service that interacts with an external API at http://localhost:3001/api. It includes endpoints to create, retrieve, update, and delete user data and is implemented using TypeScript, following SOLID principles. The application also includes caching to optimize API usage and handles API failures gracefully.

### Key Features

CRUD Operations: Provides functions to create, retrieve, update, and delete users.
Error Handling: Handles API errors with custom error messages.
Testing: Comprehensive tests are provided for all functionality.

### Prerequisites

To run and test the application, make sure you have:

Node.js (version 14 or higher)
npm (Node Package Manager)
Installation
Clone the repository to your local machine:

### Steps

1. Git clone the repository `git clone https://github.com/Nhiyhe/backend-test.git`
2. `cd` into the backend-test directory
3. run `npm install` to install dependencies
4. run `npm start`
5. run `npm run test` to run the test

## Running the Application

## To start the application:

Start the API server (or ensure the external API server is running on http://localhost:3001).

Run the application:

bash
Copy code
npm start
Running Tests
The application includes unit tests for all major functions, using Jest as the testing framework. To run the tests:

bash
Copy code
npm test
Testing Notes
The test suite covers functionality such as creating, retrieving, updating, and deleting users.
The tests include assertions for expected responses, caching, and error handling.

## Project Structure

src/client: Contains the main API client logic.
src/services: Contains business logic (e.g., userService).
tests: Contains all unit tests for the application.

## Usage

Example Commands
To create a new user (in userService):

typescript
Copy code
const userService = createUserService(apiClient);
const newUser = { name: "Jane Dan", email: "jane@example.com" };
const result = await userService.createUser(newUser);
console.log(result);
The above example will create a new user and print the result to the console, given the API server is running and accessible.

## Troubleshooting

API Server Not Running: Ensure that http://localhost:3001 is accessible, and verify the API endpoint URL.
Tests Failing Due to Mocks: Check that mockApiClient is properly configured in each test case.
