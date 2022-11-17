# My Start Kit Express / TypeScript / Mongoose
<p align="center" width="100%"><img align="center" src="./doc/My%20starter%20kit.png?raw=true" /></p>

# Description
This project is a starter for express, typescript and mongoose application, designed for Restful API's, easy to extend, to make other things.

Into, you can find an authentification by jwt service, a storage by AWS s3, validator DTOS, enums example, constant example, interfaces, and other good practices.

## Prerequisites

1. Latest version of Node to be installed(i recommend NVM, easier to install and possible to work with multiple node versions).
2. Install MongoDB and make sure it is running on default port 27017 (if not then please configure constants.ts and change the connection for mongoDB).

## Directory Structure
```
    ├── node_modules
    ├── src
    │    ├── config
    │    ├── controllers  
    │    │    ├── example.controller.ts
    │    ├── databases
    │    ├── dtos
    │    ├── enums
    │    ├── exceptions
    │    ├── http
    │    ├── interfaces
    │    ├── logs
    │    ├── messages
    │    ├── middlewares
    │    ├── models
    │    ├── routes
    │    ├── services
    │    ├── test
    │    ├── utils
    │    │
    │    ├── app.ts
    │    ├── server.ts
    ├── .env
    ├── .eslintrc
    ├── .prettierrc
    ├── jest.config.js
    ├── package.json
    ├── tsconfig.json
    ├── README.md
    ├── swagger.yaml
    ├── tsconfig.json
```

## Library
- [Node.js](https://nodejs.org/dist/latest-v18.x/docs/api/) v18.12.1
- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html) v4.9.3
- [Express](https://expressjs.com/en/starter/installing.html) v4.18.1
- [Mongoose](https://mongoosejs.com/docs/guide.html) v6.5.0
- [Jest]() v28.1.1
- [multer]() v1.4.5-lts.1
- [swagger]() v6.2.1

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# build mode
$ npm run build

# lint code
$ npm run lint
$ npm run lint:fix

# deploy in production
$ npm run deploy:prod
```

## Test

```bash
# unit tests with jest
$ npm run test
```

## Documentation

The **documentation** is generated using [swagger](https://swagger.io/docs/specification/basic-structure/) on this project
![Documentation](./doc/Swagger.png?raw=true 'Documentation')

## Authentication

The **authentication** worked by [JWT](https://jwt.io/introduction) and registration by mail with [SendGrid](https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs)

## Storage

The **storage** system use [AWS S3](https://docs.aws.amazon.com/s3/index.html) on a bucket with the use of [AWS SDK](https://www.npmjs.com/package/aws-sdk)

## Test

The **test** system use [jest]()