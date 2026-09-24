import { ArrowUpRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-background px-4 py-10 text-center md:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-125 w-175 -translate-x-1/2 rounded-full bg-white/4 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_45%)]" />
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm text-white/70 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4 text-white" />
          AI-powered professional photos
        </div>

        <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl md:text-7xl">
          Your best professional
          <br />
          <span className="bg-linear-to-r from-white via-white/80 to-white/40 bg-clip-text text-transparent">
            headshot, reimagined.
          </span>
        </h1>

        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/50 sm:text-lg">
          Upload a selfie and transform it into a polished professional headshot
          with AI-powered outfits, lighting, and backgrounds.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            onClick={() => {
              document.getElementById("upload")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="h-12 rounded-xl bg-white px-7 text-sm font-medium text-black shadow-lg shadow-white/10 transition-all hover:bg-white/90 hover:shadow-white/20"
          >
            Upload Your Selfie
            <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        <p className="mt-6 text-xs text-white/30">
          No design skills required · Ready in minutes
        </p>
      </div>
    </section>
  );
}
