// app/api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { S3 } from "aws-sdk";
import { Buffer } from "buffer";

const ALLOWED_MIME_TYPES = {
  "image/jpeg": "image",
  "image/png": "image",
  "image/svg+xml": "image",
  "application/pdf": "pdf",
} as const;

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
  apiVersion: "2006-03-01",
});

async function uploadFileToS3(
  file: Buffer,
  filename: string,
  mimetype: string
): Promise<string> {
  const timestamp = Date.now();
  const fileExtension = filename.substring(filename.lastIndexOf("."));

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${timestamp}${fileExtension}`,
    Body: file,
    ContentType: mimetype,
  };

  const data = await s3.upload(params).promise();
  return data.Location;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES[file.type as keyof typeof ALLOWED_MIME_TYPES]) {
      return NextResponse.json(
        {
          error: "Invalid file type",
          allowedTypes: "JPEG, PNG, SVG, PDF",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    if (buffer.length > 20 * 1024 * 1024) {
      // 20MB limit
      return NextResponse.json(
        {
          error: "File too large",
          details: "File size should not exceed 20MB",
        },
        { status: 400 }
      );
    }

    const fileUrl = await uploadFileToS3(buffer, file.name, file.type);

    return NextResponse.json({ url: fileUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      {
        error: "Error uploading file",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// For handling multiple file uploads
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files.length) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      if (!ALLOWED_MIME_TYPES[file.type as keyof typeof ALLOWED_MIME_TYPES]) {
        throw new Error(`Invalid file type: ${file.type}`);
      }

      const buffer = Buffer.from(await file.arrayBuffer());

      if (buffer.length > 20 * 1024 * 1024) {
        throw new Error(`File ${file.name} exceeds 20MB limit`);
      }

      return uploadFileToS3(buffer, file.name, file.type);
    });

    const fileUrls = await Promise.all(uploadPromises);

    return NextResponse.json({ urls: fileUrls }, { status: 200 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json(
      {
        error: "Error uploading files",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
