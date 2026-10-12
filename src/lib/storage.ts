import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const endpoint = process.env.S3_ENDPOINT;
const region = process.env.S3_REGION || "auto";
const bucket = process.env.S3_BUCKET || "";
const accessKeyId = process.env.S3_ACCESS_KEY_ID || "";
const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY || "";
const publicBaseUrl = process.env.S3_PUBLIC_BASE_URL || "";

const isS3Configured = Boolean(
  bucket && accessKeyId && secretAccessKey
);

let s3Client: S3Client | null = null;
if (isS3Configured) {
  s3Client = new S3Client({
    endpoint: endpoint || undefined,
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: Boolean(endpoint),
  });
}

export interface StorageUploadResult {
  url: string;
  key: string;
  size: number;
  format: string;
}

/**
 * Uploads a file buffer to S3 / Cloudflare R2 or local development folder.
 */
export async function uploadFileToStorage(
  buffer: Buffer,
  originalFilename: string,
  contentType: string,
  folder = "uploads"
): Promise<StorageUploadResult> {
  const extension = path.extname(originalFilename) || "";
  const sanitizedBase = path
    .basename(originalFilename, extension)
    .replace(/[^\w-]/g, "_")
    .toLowerCase();
  const timestamp = Date.now();
  const key = `${folder}/${sanitizedBase}_${timestamp}${extension}`;

  if (isS3Configured && s3Client) {
    try {
      await s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: buffer,
          ContentType: contentType,
        })
      );

      const url = publicBaseUrl
        ? `${publicBaseUrl.replace(/\/$/, "")}/${key}`
        : endpoint
        ? `${endpoint.replace(/\/$/, "")}/${bucket}/${key}`
        : `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

      return {
        url,
        key,
        size: buffer.length,
        format: extension.replace(".", "").toUpperCase() || "BIN",
      };
    } catch (err: any) {
      console.error("[Storage] S3 upload failed:", err);
      throw new Error(`S3 Object Storage Upload Failed: ${err.message}`);
    }
  }

  // Graceful Local Development fallback if S3 credentials are not yet set
  if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    const localDir = path.join(process.cwd(), "public", "uploads", folder);
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const localFilePath = path.join(localDir, `${sanitizedBase}_${timestamp}${extension}`);
    fs.writeFileSync(localFilePath, buffer);

    return {
      url: `/uploads/${folder}/${sanitizedBase}_${timestamp}${extension}`,
      key,
      size: buffer.length,
      format: extension.replace(".", "").toUpperCase() || "BIN",
    };
  }

  throw new Error(
    "Cloud storage is unconfigured. Please configure S3_BUCKET, S3_ACCESS_KEY_ID, and S3_SECRET_ACCESS_KEY."
  );
}

/**
 * Safely deletes a file from storage.
 */
export async function deleteFileFromStorage(key?: string): Promise<boolean> {
  if (!key) return true;

  if (isS3Configured && s3Client) {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucket,
          Key: key,
        })
      );
      return true;
    } catch (err) {
      console.error("[Storage] S3 deletion error:", err);
      return false;
    }
  }

  if (process.env.NODE_ENV === "development") {
    try {
      const localFilePath = path.join(process.cwd(), "public", key);
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
      return true;
    } catch (err) {
      console.error("[Storage] Local deletion error:", err);
      return false;
    }
  }

  return true;
}
