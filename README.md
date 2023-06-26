# Study Schedule Backend Service

This is a backend project that solves a problem of course scheduling while respecting certain constraints. The goal is to create a study schedule for users who want to complete a series of courses in a specific order.


## Problem Description

To create a more engaging learning environment, the user can choose which courses they want to take. However, there are certain constraints:

- A user can only take one course at a time.
- A user is not allowed to view a course that has another course as a prerequisite without having completed it.

The goal is to create a backend REST service that receives a list of desired micro-courses in JSON format and generates a study schedule that respects the mentioned constraints.


## What was done?

By leveraging the provided JSON payload, which includes the user's ID and a list of desired courses with their corresponding prerequisites, the backend service applies an algorithm to determine the optimal order for the courses. This algorithm respects the constraints, ensuring that users can progress through the courses in a logical and coherent manner.

The backend service utilizes Node.js and a SQL database to store and retrieve course data. Docker Compose is employed to streamline the deployment process, making it easier to set up the necessary environment. Unit tests and end-to-end tests are included to ensure the reliability and accuracy of the service.

By utilizing Firebase Authentication, the API endpoints are protected, ensuring that only authenticated users can access and interact with the service.


## Running the Project

Follow these steps to run the project:

1. Clone this repository on your local machine.
2. Make sure you have Docker and Docker Compose installed on your system.
3. In the project's root directory, run the following command to build and run the service:
```
docker-compose up
```
This will start the server and the required SQL database for the project to function.

4. Once the service is up and running, you can make POST requests to `http://localhost:3000/login` to signin into account in the Firebase authentication.
```
Here are some email-password users that can be used to login
test@test.com - 123456
test2@test.com - 654321
```


## Running the tests

To run all tests first we need to install the npm packages with this command:
```
npm install
```
Once our packages get installed you should be able to run test with:
```
npm test
```
```
---------------------------|---------|----------|---------|---------|-------------------
File                       | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
---------------------------|---------|----------|---------|---------|-------------------
All files                  |   89.86 |     72.5 |   82.25 |   89.64 | 
 src                       |   80.43 |    44.44 |   66.66 |   81.81 | 
  app.ts                   |   80.43 |    44.44 |   66.66 |   81.81 | 38,41,46-50,60-62
 src/config                |     100 |      100 |     100 |     100 | 
  db.ts                    |     100 |      100 |     100 |     100 | 
  inversify.ts             |     100 |      100 |     100 |     100 | 
  types.ts                 |     100 |      100 |     100 |     100 | 
 src/controller            |   92.98 |      100 |     100 |    92.3 |
  auth.controller.ts       |     100 |      100 |     100 |     100 |
  course.controller.ts     |   90.69 |      100 |     100 |   90.24 | 27,40,53,69
 src/entity                |     100 |      100 |     100 |     100 |
  userCourse.entity.ts     |     100 |      100 |     100 |     100 |
 src/middleware            |      85 |        0 |     100 |   88.88 |
  auth.middleware.ts       |      85 |        0 |     100 |   88.88 | 34-35
 src/repository            |      75 |      100 |   54.54 |   73.07 |
  repository.ts            |   53.33 |      100 |   28.57 |      50 | 21-39
  userCourse.repository.ts |     100 |      100 |     100 |     100 |
 src/service               |     100 |      100 |     100 |     100 |
  course.service.ts        |     100 |      100 |     100 |     100 |
  firebase.service.ts      |     100 |      100 |     100 |     100 |
 src/util                  |   79.48 |       50 |      50 |   79.48 |
  exceptions.ts            |     100 |      100 |     100 |     100 |
  response.ts              |   71.42 |      100 |   42.85 |   71.42 | 17,21,29,33
  secrets.ts               |   80.95 |       50 |     100 |   80.95 | 9-10,17,22
---------------------------|---------|----------|---------|---------|-------------------
Test Suites: 4 passed, 4 total
Tests:       29 passed, 29 total
Snapshots:   0 total
Time:        6.991 s
Ran all test suites.
```


## Endpoints

__AUTH__
```
POST - http://localhost:3000/login - Endpoint to login
Body
{
    "email": "test@test.com",
    "password": "123456"
}
```

__COURSE__
```
GET - http://localhost:3000/:userId - Returns all user courses registered
Params
:userId
```


```
POST - http://localhost:3000/take - Allows user to take a course
Body
{
    "userId": "123-xyz",
    "courseId": "Investment"
}
```


```
POST - http://localhost:3000/finish - Allows user to finish a course
Body
{
    "userId": "123-xyz",
    "courseId": "Investment"
}
```

```
POST - http://localhost:3000/schedule - Creates a course schedule
Body
{
   "userId": "123-xyz",
   "courses":[
      {
         "desiredCourse":"PortfolioConstruction",
         "requiredCourse":"PortfolioTheories"
      },
      {
         "desiredCourse":"InvestmentManagement",
         "requiredCourse":"Investment"
      }
   ]
}
```

## Built with 🛠️
* [NodeJS](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [InversifyJS](https://github.com/inversify/InversifyJS)
* [TypeORM](https://typeorm.io/#/)
* [MySQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/)


## Authors

* **Jhon Gil Sepulveda** - *Starter* - [rankey1496](https://github.com/rankey1496)


## License

This project is licensed under the ISC License.