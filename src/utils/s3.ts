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
