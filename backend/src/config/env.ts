import "dotenv/config"

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
}

export { DATABASE_URL };

const sessionSecret = process.env.SESSION_SECRET;

if (!sessionSecret) {
    throw new Error("SESSION_SECRET is required");
}

const SESSION_SECRET: string = sessionSecret;

export { SESSION_SECRET };

const awsRegion = process.env.AWS_REGION;

if (!awsRegion) {
  throw new Error("AWS_REGION is required");
}

const s3Bucket = process.env.S3_BUCKET;

if (!s3Bucket) {
  throw new Error("S3_BUCKET is required");
}

const mediaBaseUrl = process.env.MEDIA_BASE_URL;

if (!mediaBaseUrl) {
  throw new Error("MEDIA_BASE_URL is required");
}

export const AWS_REGION: string = awsRegion;
export const S3_BUCKET: string = s3Bucket;
export const MEDIA_BASE_URL: string = mediaBaseUrl;