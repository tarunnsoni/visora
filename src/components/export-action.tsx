import { useState } from "react";
import type { ExportFormat, HeadshotPreset } from "@/types";
import { cn } from "@/lib/utils";
import { Check, Copy, Download, ExternalLink, Loader2 } from "lucide-react";
import { getExportUrl } from "@/lib/transformations";
import { Button } from "@/components/ui/button";

interface ExportActionsProps {
  publicId: string;
  selectedPreset: HeadshotPreset;
}

const FORMATS: { value: ExportFormat; label: string }[] = [
  { value: "jpg", label: "JPG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WEBP" },
];

export default function ExportActions({
  publicId,
  selectedPreset,
}: ExportActionsProps) {
  const [format, setFormat] = useState<ExportFormat>("webp");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function buildExportUrl(): string {
    return getExportUrl(publicId, selectedPreset, format);
  }

  async function handleDownload() {
    setLoading(true);
    setError(null);

    try {
      const url = buildExportUrl();
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Download failed (${res.status})`);
      }

      const blob = await res.blob();

      if (blob.size === 0) {
        throw new Error("Download returned an empty file");
      }

      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `headshot-${selectedPreset.id}.${format}`;
      a.click();

      URL.revokeObjectURL(a.href);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleOpenTab() {
    setLoading(true);
    setError(null);

    try {
      const url = buildExportUrl();
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyUrl() {
    setLoading(true);
    setError(null);

    try {
      const url = buildExportUrl();

      await navigator.clipboard.writeText(url);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Export failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="px-4 py-10 md:py-12">
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl border border-white/10 bg-white/3 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-xl font-semibold tracking-tight text-white">
              Export your headshot
            </h3>

            <p className="mt-2 text-sm text-white/40">
              Choose a format and save your final headshot
            </p>
          </div>

          {/* Format selector */}
          <div className="mt-7">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/30">
              File format
            </p>

            <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-black/20 p-1">
              {FORMATS.map((f) => (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setFormat(f.value)}
                  className={cn(
                    "rounded-lg px-4 py-2.5 text-sm font-medium transition-all",
                    format === f.value
                      ? "bg-white text-black shadow-sm"
                      : "text-white/50 hover:bg-white/5 hover:text-white",
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 grid gap-2 sm:grid-cols-3">
            <Button
              type="button"
              onClick={handleDownload}
              disabled={loading}
              className="h-11 rounded-xl bg-white text-black hover:bg-white/90"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Download className="mr-2 h-4 w-4" />
              )}
              Download
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleOpenTab}
              disabled={loading}
              className="h-11 rounded-xl border-white/10 bg-white/3 text-white/70 hover:bg-white/[0.07] hover:text-white"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Open
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleCopyUrl}
              disabled={loading}
              className="h-11 rounded-xl border-white/10 bg-white/3 text-white/70 hover:bg-white/[0.07] hover:text-white"
            >
              {copied ? (
                <Check className="mr-2 h-4 w-4" />
              ) : (
                <Copy className="mr-2 h-4 w-4" />
              )}

              {copied ? "Copied" : "Copy URL"}
            </Button>
          </div>

          {/* Error */}
          {error && (
            <p className="mt-4 rounded-lg border border-red-500/10 bg-red-500/5 px-3 py-2 text-center text-sm text-red-400">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
