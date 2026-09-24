import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { Hero } from "@/components/hero";
import { UploadCard } from "@/components/upload-card";
import { useHeadshot } from "@/hooks/useHeadshot";
import ResultPreview from "@/components/result-preview";
import ExportActions from "@/components/export-action";
import TransformationGrid from "@/components/transformation-grid";

export function Home() {
  const headshot = useHeadshot();

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 px-4 py-4">
        <div className="text-lg font-bold">
          <span>
            Visora <span>AI.</span>
          </span>
        </div>
      </header>

      <Hero />

      <UploadCard
        uploadStatus={headshot.uploadStatus}
        uploadError={headshot.uploadError}
        onUploadError={headshot.handleUploadError}
        onUploadStart={headshot.handleUploadStart}
        onUploadSuccess={headshot.handleUploadSuccess}
      />

      {headshot.hasUpload && headshot.originalImage && (
        <section className="px-4 py-8">
          <div className="mx-auto max-w-md text-center">
            <h2 className="mb-4 text-xl font-semibold">Original Upload</h2>
            <AdvancedImage
              cldImg={headshot.originalImage}
              plugins={[placeholder({ mode: "blur" }), lazyload()]}
              alt="Original Upload"
              className="mx-auto rounded-xl shadow-lg"
            />
          </div>
        </section>
      )}

      {headshot.hasUpload && (
        <TransformationGrid
          title="AI Headshot Styles"
          presets={headshot.presetImages}
          selectedPresetId={headshot.selectedPresetId}
          onSelect={headshot.selectPreset}
        />
      )}

      {headshot.hasUpload && (
        <ResultPreview
          originalImage={headshot.originalImage}
          selectedImage={headshot.selectedImage}
          selectedPreset={headshot.selectedPreset}
        />
      )}

      {headshot.hasUpload && headshot.publicId && headshot.selectedPreset && (
        <ExportActions
          publicId={headshot.publicId}
          selectedPreset={headshot.selectedPreset}
        />
      )}
    </div>
  );
}
