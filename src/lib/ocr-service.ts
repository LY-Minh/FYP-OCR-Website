import { FileMetadata, InitiateUploadResponse, OCRFinalResult } from "@/types/ocr";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// Helper to get token
const getAuthHeader = () => {
  if (typeof window === "undefined") return {}; // Safety check for SSR
  const token = localStorage.getItem("accessToken");
  return token ? { "Authorization": `Bearer ${token}` } : {};
};

export async function processOCRJob(files: File[]): Promise<OCRFinalResult[]> {
  // 1. Initiate Session (Authenticated)
  const fileMetas: FileMetadata[] = files.map((f) => ({
    filename: f.name,
    content_type: f.type,
  }));

  const initResp = await fetch(`${API_BASE_URL}/ocr/initiate-uploads`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeader() 
    } as HeadersInit, // <--- FIX: Explicit type casting
    body: JSON.stringify({ files: fileMetas }),
  });

  if (initResp.status === 401) throw new Error("Session expired. Please login again.");
  if (!initResp.ok) throw new Error("Failed to initiate upload session.");
  
  const { job_id, uploads } = (await initResp.json()) as InitiateUploadResponse;

  // 2. Parallel Upload to S3 (Direct upload, no auth header needed for S3 presigned URL)
  const uploadPromises = uploads.map((upload) => {
    const file = files.find((f) => f.name === upload.filename);
    if (!file) return Promise.reject(`File ${upload.filename} not found`);

    return fetch(upload.upload_url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });
  });

  const s3Results = await Promise.allSettled(uploadPromises);
  if (s3Results.some((r) => r.status === "rejected")) {
    throw new Error("One or more files failed to upload to S3.");
  }

  // 3. Trigger OCR Processing (Authenticated)
  const ocrResp = await fetch(`${API_BASE_URL}/ocr/get-ocr-results`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...getAuthHeader()
    } as HeadersInit, // <--- FIX: Explicit type casting
    body: JSON.stringify({ job_id }),
  });

  if (!ocrResp.ok) throw new Error("The OCR process failed on the server.");

  return (await ocrResp.json()) as OCRFinalResult[];
}