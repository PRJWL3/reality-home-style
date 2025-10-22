import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ARFeature } from "@/components/ARFeature";
import { BottomNav } from "@/components/BottomNav";
import { ARCamera } from "@/components/ARCamera";

const Index = () => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero onOpenCamera={() => setIsCameraOpen(true)} />
        <ProductGrid onOpenCamera={() => setIsCameraOpen(true)} />
        <ARFeature onOpenCamera={() => setIsCameraOpen(true)} />
      </main>
      <BottomNav onOpenCamera={() => setIsCameraOpen(true)} />
      <div className="h-16 md:hidden" /> {/* Spacer for bottom nav */}

      {isCameraOpen && <ARCamera onClose={() => setIsCameraOpen(false)} />}
    </div>
  );
};

export default Index;
