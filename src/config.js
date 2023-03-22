// // digital-ocean.config.ts
// import { registerAs } from '@nestjs/config';

// export default registerAs('digitalOcean', () => ({
//   endpoint: process.env.DO_END_POINT,
//   accessKeyId: process.env.DO_ACCESS_KEY_ID,
//   secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
//   bucketName: process.env.S3_BUCKET_NAME,
//   region: process.env.DO_REGION,
// }));

// import { S3Client } from '@aws-sdk/client-s3';

// const s3Client = new S3Client({
//   forcePathStyle: false,
//   endpoint: 'https://ladiescdn.sgp1.digitaloceanspaces.com',
//   region: 'sgp1',
//   credentials: {
//     accessKeyId: process.env.DO_ACCESS_KEY_ID,
//     secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
//   },
// });

// export { s3Client };
