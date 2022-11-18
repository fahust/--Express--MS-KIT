# My Start Kit Express / TypeScript / Mongoose

<p align="center" width="100%"><img align="center" src="./doc/My%20starter%20kit.png?raw=true" /></p>

# Description

This project is a starter for express, typescript and mongoose application, designed for Restful API's, easy to extend, to make other things.

Into, you can find an authentification by jwt service, a storage by AWS s3, validator DTOS, enums example, constant example, interfaces, and other good practices.

## Prerequisites

1. Latest version of Node to be installed(i recommend NVM, easier to install and possible to work with multiple node versions).
2. Install MongoDB and make sure it is running on default port 27017 (if not then please configure constants.ts and change the connection for mongoDB).

Then, install all packages in project.

```bash
yarn
```

```bash
npm i
```

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

The **test** system use [jest](https://jestjs.io/docs/getting-started) run with --coverage parameter

```bash
# unit tests with jest --coverage
$ npm run test
```

<p align="center" width="100%"><img align="center" src="./doc/coverage.png?raw=true" /></p>

## Documentation

The **documentation** is generated using [swagger](https://swagger.io/docs/specification/basic-structure/) on the url http://localhost:3000/api-docs/
![Documentation](./doc/Swagger.png?raw=true 'Documentation')

## Authentication

The **authentication** worked by [JWT](https://jwt.io/introduction) and registration by mail with [SendGrid](https://docs.sendgrid.com/for-developers/sending-email/quickstart-nodejs)

<details>
  <summary>Authentication Code</summary>
  <p>

```javascript
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import userModel from '@models/users.model';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);

    if (Authorization) {
      const secretKey: string = SECRET_KEY;
      const verificationResponse = (await verify(Authorization, secretKey)) as DataStoredInToken;
      const userId = verificationResponse._id;
      const findUser = await userModel.findById(userId);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
```

  </p>
</details>

## Storage

The **storage** system use [AWS S3](https://docs.aws.amazon.com/s3/index.html) on a bucket with the use of [AWS SDK](https://www.npmjs.com/package/aws-sdk)

<details>
  <summary>Storage AWS Code</summary>
  <p>

```javascript
require('dotenv').config();
import fs from 'fs';
import S3 from 'aws-sdk/clients/s3';
import { ManagedUpload } from 'aws-sdk/lib/s3/managed_upload';

const bucketName = process.env.AWS_BUCKET_NAME;

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// uploads a file to s3
export function uploadFile(file: Express.Multer.File): Promise<ManagedUpload.SendData> {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

// downloads a file from s3
export function getFileStream(fileKey) {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  };

  return s3.getObject(downloadParams).createReadStream();
}
```

  </p>
</details>

## Logs

All routes and errors messages are logged with library [Winston](https://github.com/winstonjs/winston)

<p align="center" width="100%"><img align="center" src="./doc/logs.png?raw=true" /></p>
