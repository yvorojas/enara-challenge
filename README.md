# Enara Code Challenge!

enara-challenge

## Context

Challenge to apply in Enara Health that consist in implement a time tracker for projects.

Based on ES6

Builded with

- NodeJs
- Typescript
- Express

## How-to run

first you should have npm and node installed in your local machine, then you should execute this command in the terminal

```shell
# install dependencies
npm install
# or
npm i
```

then you have to add the .env file in root folder with the corresponding environment variables

example:

```shell
PORT=3080 #port to expose solution
APP_ID=enara-challenge #APP ID (for log trace purpose)
LOG_LEVEL=debug #log level, use debug in your local machine
MONGOURI=mongodb+srv://enara-user:DP4ptkhOBJh7@enara.rifs8.mongodb.net/tracker?retryWrites=true&w=majority #mongo url connection
CONNECT_TO_MONGO=true #env variable to define if is neccesary connect with a mongo instance
NODE_ENV=development  #node enviroment
```

as you could see, I use a mongo connection related a Atlas mongoDB cluster that I created for this solution. Use the same if you prefer.

and the final step is execute the run command in the terminal

```shell
# dev execution
npm run dev
```

tada!! your application should be running! (I hope :S)

if you open in the browser the url http://localhost:3080 (assuming that you use the 3080 value in PORT env variable) you should see something like this:

![public site screenshot](/public/resources/public.png 'public site!')

and if you click in the link you should get into the Swagger UI.

![swagger](/public/resources/swagger.png 'swagger')

the other way to enter to Swagger UI is add /api-explorer to the root route in the browser

## How-to use

you can use this application directly from Swagger UI or postman or if you preffer the terminal using curl or another command to call to the application endpoints.

there are 4 endpoints in the application.

- api/v1/tracker/{project}/start: start a project time
  ![start example](/public/resources/start.png 'start example in swagger')
- api/v1/tracker/{project}/stop: stop a project segment time
  ![stop example](/public/resources/stop.png 'stop example in swagger')
- api/v1/tracker/report: get projects full report with total duration
  ![report example](/public/resources/report.png 'report example in swagger')
- api/v1/tracker/{project}/report: get report for a specific project with total duration and finished segment duration
  ![report by project example](/public/resources/report-by-project.png 'report by project example in swagger')

For more details, please take a look to Swagger UI, you may find response examples and other interesting things.

## Test Strategy

I used as a test strategy TDD for unit test and post-test for integration test. I did the test using jest as a test framework. For integration test I use supertest. Actually the solution have the 100% of coverage for tested files (those files that solve the business use cases)

to run test you have 4 differents commands

```shell
# unit test execution
npm run test:unit

# integration test execution
npm run test:integration

# both test execution
npm run test

# coverage execution (report folder: ./coverage/lcov-report/index.html)
npm run coverage
```

![coverage examplle](/public/resources/coverage.png 'coverage example')

## Scaffolding Explanation

I did this scaffold based in some principles of Clean Architecture, trying to isolate the business domain implementation from the infrastructure. Here is a explanation of what can you find in the solution folders.

    .
    ├── public                   # Contains the static html with a link to open api (swagger)
    ├── src                      # Contains the source code.
    │   └── domains              # Contains the domain definition for the specific solution
    |         └── ${domain_name} # Contains a specific domain content
    |                  └── controllers # Contains a controller interface
    |                  └── routes      # Contains the defined routes for the domain
    |                  └── services    # Contains the use cases
    |  └── infrastructure      # Contains the infrastructure content
    |         └── common       # Contains the common elements to be used in the differents domains
    |         └── middlewares  # Contains the application's middlewares (express format)
    |         └── openApi      # Contains the OAS (Swagger 3.0)
    |         └── repositories # Contains the persistence interface
    |         └── routes       # Contains the route centralizer
    |         └── server.ts    # Do the application lift
    | index.ts                 # Application started point.

## Commands

Here is a summary of all the different commands.

```shell

# install dependencies
npm install

# git hook preparation (with husky)
npm run prepare

# dev execution
npm run dev

npm run dev:debug

# unit test execution
npm run test:unit

# integration test execution
npm run test:integration

# both test execution
npm run test

# coverage execution (report folder: ./coverage/lcov-report/index.html)
npm run coverage

# prettier check (code formatter)
npm run prettier:check

# prettier format (code formatter)
npm run prettier:format

# linter check (SAST and code formatter)
npm run lint

# linter auto fix tool
npm run lint:fix

# docker container build
npm run docker:build

# docker container run (TODO: add a dinamic port)
npm run docker:run

# typescript compile
npm run compile

# prod execution
npm start
```
