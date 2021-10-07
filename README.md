# Enara Code Challenge!

enara-challenge

## Context

Builded with

- NodeJs
- Typescript
- Express

## Commands

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

## Scaffolding Explanation

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
    |         └── gateways     # Contains all the wrappers related with external comunication
    |         └── middlewares  # Contains the application's middlewares (express format)
    |         └── openApi      # Contains the OAS (Swagger 3.0)
    |         └── repositories # Contains the persistence interface
    |         └── routes       # Contains the route centralizer
    |         └── server.ts    # Do the application lift
    | index.ts                 # Application started point.
