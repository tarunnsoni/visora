import { Hero } from "@/components/hero";
import { UploadCard } from "@/components/upload-card";

export function Home() {
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

      <UploadCard />
    </div>
  );
}
