import { AlertCircle, ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UploadStatus } from "@/types";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { uploadImageToCloudinary } from "@/cloudinary/upload-direct";
import { type CloudinaryUploadResult } from "@/cloudinary/UploadWidget";

interface UploadCardProps {
  uploadStatus: UploadStatus;
  uploadError: string | null;
  onUploadError: (error: Error) => void;
  onUploadStart: () => void;
  onUploadSuccess: (result: CloudinaryUploadResult) => void;
}

const ACCEPT = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
};

export function UploadCard({
  uploadStatus,
  onUploadError,
  onUploadStart,
  uploadError,
  onUploadSuccess,
}: UploadCardProps) {
  const [progress, setProgress] = useState<number>(0);

  const handleUploadFile = async (file: File) => {
    onUploadStart();
    setProgress(0);
    try {
      const result = await uploadImageToCloudinary(file);
      onUploadSuccess(result);
      setTimeout(() => {
        document.getElementById("upload")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 1000);
    } catch (error) {
      onUploadError(new Error("Upload filed."));
    }
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      onUploadError(new Error("Please upload a JPG, PNG, or WEBP image."));
      return;
    }

    handleUploadFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPT,
    disabled: uploadStatus === "uploading",
    maxFiles: 1,
    multiple: false,
  });

  const isUploading = uploadStatus === "uploading";

  return (
    <section id="upload" className="px-4 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Upload your selfie
          </h2>

          <p className="mt-2 text-sm text-white/50 md:text-base">
            Start with a clear photo of yourself
          </p>
        </div>

        <label
          {...getRootProps()}
          htmlFor="selfie-upload"
          className={cn(
            "group relative flex min-h-80 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/15 bg-white/3 p-8 text-center transition-all",
            "hover:border-white/30 hover:bg-white/5",
            isDragActive && "hover:border-white/30 hover:bg-white/5",
            isUploading && "pointer-events-none opacity-60",
          )}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/3 blur-3xl transition-all group-hover:bg-white/6" />

          <div className="relative z-10 mb-6 flex size-16 items-center justify-center rounded-2xl border border-white/10 bg-white/6 shadow-lg">
            <ImageIcon className="size-7 text-white/70 transition-colors group-hover:text-white" />
          </div>

          <div className="relative z-10">
            <p className="text-lg font-medium text-white">
              Drag & drop your selfie here
            </p>

            <p className="mt-2 text-sm text-white/40">
              or click anywhere to browse
            </p>

            <p className="mt-4 text-xs text-white/30">
              JPG, PNG or WEBP · Max 10MB
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="relative z-10 mt-6 rounded-lg border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"
          >
            <Upload className="mr-2 size-4" />
            Choose photo
          </Button>

          <input
            id="selfie-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            {...getInputProps()}
          />

          {isUploading && (
            <div className="mt-2">
              <p>Uploading... {progress > 0 ? `${progress}%` : ""}</p>
            </div>
          )}

          {uploadError && (
            <div className="mt-2 flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {uploadError}
            </div>
          )}
        </label>

        <p className="mt-4 text-center text-xs text-white/30">
          Your photo is securely processed and never used without your
          permission.
        </p>
      </div>
    </section>
  );
}
