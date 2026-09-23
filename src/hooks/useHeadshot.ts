import type { CloudinaryUploadResult } from "@/cloudinary/UploadWidget";
import type { UploadStatus } from "@/types";
import { useState } from "react";

export function useHeadshot() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);
  const [seletedPresetId, setSeletedPresetId] = useState<string | null>(null);

  const handlerUploadStart = () => {
    setUploadError(null);
    setUploadStatus("uploading");
  };

  const handleUploadSuccess = (result: CloudinaryUploadResult) => {
    if (result.resource_type !== "image") {
      setUploadStatus("error");
      setUploadError("Please upload an image file (JPG, PNG, WEBP)");
      return;
    }
    setSeletedPresetId(null);
    setPublicId(result.public_id);
    setUploadError(null);
    setUploadStatus("success");
  };

  const handleUploadError = (error: Error) => {
    setUploadError(error.message);
    setUploadStatus("error");
  };

  return {
    uploadError,
    uploadStatus,
    handleUploadError,
    handlerUploadStart,
    handleUploadSuccess,
    publicId,
    seletedPresetId,
  };
}
