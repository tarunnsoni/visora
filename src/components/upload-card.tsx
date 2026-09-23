import { ImageIcon, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UploadCard() {
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
          htmlFor="selfie-upload"
          className="group relative flex min-h-80 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-white/15 bg-white/3 p-8 text-center transition-all hover:border-white/30 hover:bg-white/5"
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
          />
        </label>

        <p className="mt-4 text-center text-xs text-white/30">
          Your photo is securely processed and never used without your
          permission.
        </p>
      </div>
    </section>
  );
}
