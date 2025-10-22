import { Button } from "@/components/ui/button";
import { Scan, Sparkles } from "lucide-react";
import heroRoom from "@/assets/hero-room.jpg";

interface HeroProps {
  onOpenCamera: () => void;
}

export const Hero = ({ onOpenCamera }: HeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroRoom} 
          alt="Modern interior design showcase" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>
      
      <div className="container relative z-10 px-4">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Augmented Reality Design
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Visualize Your Space in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AR
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
            Place furniture and decor in your room using augmented reality. 
            See how products look before you buy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="lg" className="gap-2" onClick={onOpenCamera}>
              <Scan className="h-5 w-5" />
              Start AR Experience
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}>
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
