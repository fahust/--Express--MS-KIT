# My Start Kit Express / TypeScript / Mongoose
<p align="center" width="100%"><img align="center" src="./doc/My%20starter%20kit.png?raw=true" /></p>

## Description

This project is an exemple starter kit with this different framework and language :

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

The **authentication** worked by [JWT](https://jwt.io/introduction) and registration by mail with [SwiftMailer](https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs)

## Storage

The **storage** system use [AWS S3](https://docs.aws.amazon.com/s3/index.html) on a bucket with the use of [AWS SDK](https://www.npmjs.com/package/aws-sdk)

## Test

The **test** system use [jest]()