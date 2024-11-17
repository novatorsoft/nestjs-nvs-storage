export default () => ({
  minio: {
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    bucket: process.env.MINIO_BUCKET,
    endpoint: process.env.MINIO_ENDPOINT,
    region: process.env.MINIO_REGION,
  },
});
