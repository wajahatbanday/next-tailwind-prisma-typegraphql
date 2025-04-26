import { useState } from "react";
import axios, { AxiosResponse } from "axios";

type UploadResponse = {
  url: string;
};

type MultipleUploadResponse = {
  urls: string[];
};

// For tracking individual file results
export type UploadResult = {
  url: string;
  key?: string; // Optional key returned from the server
};

export const useUploadFile = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Single file upload
  const upload = async (f: File): Promise<string | null> => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", f);
      formData.append("uploadType", "config");

      const uploadConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const uploadImageAPI = `/api/upload`;

      const response: AxiosResponse<UploadResponse> = await axios.post(
        uploadImageAPI,
        formData,
        uploadConfig
      );
      return response.data.url;
    } catch (e) {
      console.error(e);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Multiple files upload (simplified)
  const uploadMultiple = async (files: File[]): Promise<UploadResult[]> => {
    if (!files.length) return [];

    setIsLoading(true);

    try {
      // Method 1: Try bulk upload with PUT endpoint
      if (files.length > 1) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });

        const uploadConfig = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const response: AxiosResponse<MultipleUploadResponse> = await axios.put(
          `/api/upload`,
          formData,
          uploadConfig
        );

        // Map the array of URLs to the expected format
        return response.data.urls.map((url) => ({ url }));
      }

      // Method 2: If it's just one file, use the regular upload endpoint
      else {
        const url = await upload(files[0]);
        return url ? [{ url }] : [];
      }
    } catch (e) {
      console.error("Error in multiple file upload:", e);

      // Fallback to individual uploads if bulk upload fails
      try {
        const results = await Promise.all(
          files.map(async (file) => {
            const url = await upload(file);
            return { url: url || "" };
          })
        );
        return results;
      } catch (fallbackError) {
        console.error("Fallback upload also failed:", fallbackError);
        return [];
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { upload, uploadMultiple, isLoading };
};
