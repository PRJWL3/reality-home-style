import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { ARFeature } from "@/components/ARFeature";
import { BottomNav } from "@/components/BottomNav";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <ARFeature />
      </main>
      <BottomNav />
      <div className="h-16 md:hidden" /> {/* Spacer for bottom nav */}
    </div>
  );
};

export default Index;
