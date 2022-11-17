# My Start Kit Express / TypeScript / Mongoose

## Description

This project is an exemple starter kit with this different framework and language :

- [Node.js](https://nodejs.org/dist/latest-v18.x/docs/api/)
- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [Express](https://expressjs.com/en/starter/installing.html)
- [Mongoose](https://mongoosejs.com/docs/guide.html)
- [Jest](https://jestjs.io/docs/getting-started)

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

## Version

This package is created and used on [node](https://nodejs.org/dist/latest-v18.x/docs/api/) v18.12.1

## Documentation

The documentation is generated using [swagger](https://swagger.io/docs/specification/basic-structure/) on this project
![Documentation](./doc/Swagger.png?raw=true 'Documentation')

## Authentication

The authentication worked by [JWT](https://jwt.io/introduction) and registration by mail with [SwiftMailer](https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs)

## Storage

We store the images that need to be stored using [AWS S3](https://docs.aws.amazon.com/s3/index.html) on a bucket with the use of [AWS SDK](https://www.npmjs.com/package/aws-sdk)