import type { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import type { HeadshotPreset } from "../types";
import { AdvancedImage } from "@cloudinary/react";

interface ResultPreviewProps {
  originalImage: CloudinaryImage | null;
  selectedImage: CloudinaryImage | null;
  selectedPreset: HeadshotPreset | null;
}

export default function ResultPreview({
  originalImage,
  selectedImage,
  selectedPreset,
}: ResultPreviewProps) {
  if (!selectedImage || !selectedPreset || !originalImage) return null;

  return (
    <section className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            Your selected headshot
          </h2>

          <p className="mt-2 text-sm text-white/40">{selectedPreset.name}</p>
        </div>

        {/* Preview */}
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/3 p-4 shadow-2xl shadow-black/20 backdrop-blur-xl md:grid-cols-2 md:p-5">
          {/* Before */}
          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/30">
                Before
              </p>
            </div>

            <div className="aspect-4/5 overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/5">
              <AdvancedImage
                cldImg={originalImage}
                alt="Original selfie"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* After */}
          <div className="min-w-0">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-white/70">
                After
              </p>

              <span className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-[10px] font-medium text-white/50">
                AI Enhanced
              </span>
            </div>

            <div className="aspect-4/5 overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10">
              <AdvancedImage
                key={selectedPreset.id}
                cldImg={selectedImage}
                alt={selectedPreset.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
