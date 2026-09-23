import { Hero } from "@/components/hero";
import { UploadCard } from "@/components/upload-card";
import { useHeadshot } from "@/hooks/useHeadshot";

export function Home() {
  const {
    uploadStatus,
    uploadError,
    handlerUploadStart,
    handleUploadError,
    handleUploadSuccess,
  } = useHeadshot();

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 px-4 py-4">
        <div className="text-lg font-bold">
          <span>
            Visora. <span>AI</span>
          </span>
        </div>
      </header>

      <Hero />

      <UploadCard
        onUploadError={handleUploadError}
        onUploadStart={handlerUploadStart}
        onUploadSuccess={handleUploadSuccess}
        uploadError={uploadError}
        uploadStatus={uploadStatus}
      />
    </div>
  );
}
