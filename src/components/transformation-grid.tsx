import type { CloudinaryImage } from "@cloudinary/url-gen/assets/CloudinaryImage";
import type { HeadshotPreset } from "../types";
import { AdvancedImage, lazyload, placeholder } from "@cloudinary/react";
import { cn } from "../lib/utils";
import { Check } from "lucide-react";

interface PresetImage {
  preset: HeadshotPreset;
  image: CloudinaryImage;
}

interface TransformationGridProps {
  title: string;
  presets: PresetImage[];
  selectedPresetId: string | null;
  onSelect: (id: string) => void;
}

function PresetCard({
  preset,
  image,
  isSelected,
  onSelect,
}: {
  preset: HeadshotPreset;
  image: CloudinaryImage;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button onClick={onSelect} type="button" className="group w-full text-left">
      <div
        className={cn(
          "relative aspect-4/5 w-full overflow-hidden rounded-2xl border bg-white/3 transition-all",
          isSelected
            ? "border-white/50 shadow-xl shadow-white/5"
            : "border-white/10 hover:border-white/25",
        )}
      >
        <AdvancedImage
          cldImg={image}
          plugins={[placeholder({ mode: "blur" }), lazyload()]}
          alt={preset.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Image overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full bg-white shadow-lg">
            <Check className="size-4 text-black" />
          </div>
        )}
      </div>

      <div className="px-1 pt-4">
        <h4 className="font-medium text-white transition-colors group-hover:text-white/80">
          {preset.name}
        </h4>

        <p className="mt-1 text-xs leading-5 text-white/40">
          {preset.description}
        </p>
      </div>
    </button>
  );
}

export default function TransformationGrid({
  title,
  presets,
  onSelect,
  selectedPresetId,
}: TransformationGridProps) {
  if (presets.length === 0) return null;

  return (
    <section id="transformation-grid" className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
            {title}
          </h2>

          <p className="mt-2 text-sm text-white/40">
            Outfit swap · Background replace · Optimized for web
          </p>

          <p className="mt-3 text-xs text-white/30">
            Styles generate one at a time · ~30–60s each
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {presets.map(({ preset, image }) => (
            <PresetCard
              key={preset.id}
              preset={preset}
              image={image}
              isSelected={selectedPresetId === preset.id}
              onSelect={() => onSelect(preset.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
